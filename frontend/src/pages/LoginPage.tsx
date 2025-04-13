import React, { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { LoginRequest } from '@/types/auth.types';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Field, ErrorMessage, FormikProps } from 'formik';
import { Form } from '@/components/forms/components';
import AuthLayout from '@/components/layouts/AuthLayout';

// Shadcn UI components with correct import paths
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Login validation schema
const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

interface VerificationAlertType {
  handleResendVerification: () => void;
  resendingVerification: boolean;
}

const VerificationAlert = ({ handleResendVerification, resendingVerification }: VerificationAlertType) => (
  <Alert className="block bg-amber-50 border-amber-200 mb-4 w-full">
    <div className="flex items-center justify-between w-full">
      <Mail className="h-4 w-4 text-amber-600 mr-2" />
      <AlertDescription className="text-amber-800 flex-1">
        Your email is not verified. Need a new verification email?
      </AlertDescription>
      <Button
        variant="outline"
        size="sm"
        className="ml-2 border-amber-500 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
        onClick={handleResendVerification}
        disabled={resendingVerification}
      >
        {resendingVerification ? (
          <span className="flex items-center">
            <LoadingSpinner size="sm" className="mr-1" /> Sending...
          </span>
        ) : (
          "Resend"
        )}
      </Button>
    </div>
  </Alert>
)

const LoginPage: React.FC = () => {
  const [formError, setFormError] = React.useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const { login, googleLogin, resendVerification } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State to track if the user needs email verification
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendingVerification, setResendingVerification] = useState(false);

  const initialValues: LoginRequest = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginRequest, { setSubmitting, setFieldError }: FormikHelpers<LoginRequest>) => {
    // Clear previous errors
    setFormError({});
    setNeedsVerification(false);

    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';

      // More comprehensive error handling with better pattern matching
      if (errorMessage.toLowerCase().includes('email not found')) {
        setFieldError('email', 'Email not found');
      } else if (errorMessage.toLowerCase().includes('invalid password')) {
        setFieldError('password', 'Invalid Password');
      } else if (errorMessage.toLowerCase().includes('verify your email')) {
        // This is when a user tries to log in without verifying their email
        setNeedsVerification(true);
        setVerificationEmail(values.email);
        setFormError({ general: 'Your email has not been verified yet. Please check your inbox or request a new verification email.' });
      } else {
        setFormError({ general: errorMessage });
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError({});
    try {
      await googleLogin();
      // The page will be redirected to Google's OAuth page
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during Google login';
      setFormError({ general: errorMessage });

      toast({
        title: "Google Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Function to handle resending verification email
  const handleResendVerification = async () => {
    if (!verificationEmail) return;

    setResendingVerification(true);

    try {
      await resendVerification(verificationEmail);

      toast({
        title: "Verification Email Sent",
        description: "A new verification email has been sent to your inbox. Please check and follow the instructions.",
        variant: "default"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend verification email';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setResendingVerification(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome to Job Board"
      subtitle="Find your dream job or the perfect candidate"
      imageSrc="/auth-background-alt.svg"
      imagePosition="right"
    >
      <Card className="border-border/40 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {formError.general && (
            <div className="bg-destructive/15 text-destructive flex items-center p-3 rounded-md text-sm" role="alert">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>{formError.general}</span>
            </div>
          )}

          {needsVerification && (
            <VerificationAlert resendingVerification={resendingVerification} handleResendVerification={handleResendVerification} />
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    className={(touched.email && errors.email) || formError.email ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-destructive" />
                  {formError.email && <div className="text-sm text-destructive">{formError.email}</div>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={(touched.password && errors.password) || formError.password ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="password" component="div" className="text-sm text-destructive" />
                  {formError.password && <div className="text-sm text-destructive">{formError.password}</div>}
                </div>

                <div className="flex items-center space-x-2">
                  <Field
                    as={Checkbox}
                    id="remember"
                    name="remember"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" /> Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Google OAuth Button */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
