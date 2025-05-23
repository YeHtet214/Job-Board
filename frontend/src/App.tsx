import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/authContext';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import SessionExpiredModal from './components/auth/SessionExpiredModal';
import { Toaster } from './components/ui/toaster';
import './App.css';
import { ThemeProvider } from './components/ThemeProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000, // 1 minutes
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <Router>
              <SessionExpiredModal />
              <AppRoutes />
              <Toaster />
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
