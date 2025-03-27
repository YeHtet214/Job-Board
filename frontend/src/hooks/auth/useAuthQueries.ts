import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../../../services/auth.service';
import type { User, LoginRequest, RegisterRequest, VerifiedEmailResponse } from '../../../types/auth.types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  currentUser: () => [...authKeys.user(), 'current'] as const,
  verification: () => [...authKeys.all, 'verification'] as const,
  verifyEmail: (token: string) => [...authKeys.verification(), token] as const,
};

// Current User Query
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      try {
        // Only attempt to fetch if we have a token
        if (!authService.isAuthenticated()) {
          return null;
        }
        const user = await authService.getCurrentUser();
        return user;
      } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// Login Mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, LoginRequest>({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (user) => {
      // Update cached user data
      queryClient.setQueryData(authKeys.currentUser(), user);
      // Invalidate any queries that might depend on authentication state
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

// Register Mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, RegisterRequest>({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (user) => {
      // Update cached user data
      queryClient.setQueryData(authKeys.currentUser(), user);
      // Invalidate any queries that might depend on authentication state
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Registration error:', error);
    },
  });
};

// Logout Mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear user data from cache
      queryClient.setQueryData(authKeys.currentUser(), null);
      // Invalidate all queries to refetch any public data that might be needed
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Still remove user data even if the API call fails
      queryClient.setQueryData(authKeys.currentUser(), null);
    },
  });
};

// Email Verification Mutation
export const useVerifyEmail = (token: string) => {
  return useQuery<VerifiedEmailResponse>({
    queryKey: authKeys.verifyEmail(token),
    queryFn: async () => {
      try {
        const response = await authService.verifyEmail(token);
        return response;
      } catch (error) {
        console.error('Email verification error:', error);
        throw error;
      }
    },
    enabled: !!token, // Only run if we have a token
    retry: false,
  });
};

// Google Login Mutations
export const useGoogleLogin = () => {
  return useMutation<void, Error, void>({
    mutationFn: () => authService.googleLogin(),
  });
};

export const useGoogleCallback = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, string>({
    mutationFn: (code: string) => authService.handleGoogleCallback(code),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.currentUser(), user);
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Google callback error:', error);
    },
  });
};
