import '@testing-library/jest-dom/vitest';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configure path aliases
vi.mock('@/contexts/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/react-queries/job', () => ({
  useJobsData: vi.fn(),
}));

vi.mock('@/hooks/react-queries/job/useSavedJobQueries', () => ({
  useBatchJobSavedStatus: vi.fn(),
}));

// Add global test utilities
declare global {
  // eslint-disable-next-line no-var
  var expect: typeof import('vitest').expect;
}

global.expect = expect;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Setup path aliases
vi.mock('@/components', () => ({
  // Add component mocks here as needed
}));
