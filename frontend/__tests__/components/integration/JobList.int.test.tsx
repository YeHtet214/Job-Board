import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JobList from '@/components/jobs/JobList';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/hooks/react-queries/job', () => ({
  useJobsData: () => ({
    jobs: [
      {
        id: '1',
        title: 'Frontend Dev',
        location: 'Kuala Lumpur',
        type: 'FULL_TIME',
        salaryMin: 1000,
        salaryMax: 2000,
        experienceLevel: 'INTERMEDIATE',
        requiredSkills: ['React', 'TypeScript'],
        createdAt: new Date().toISOString(),
        company: { name: 'Company A', logo: '' },
        postedById: '1',
        companyId: '1',
        postedBy: { firstName: 'Admin', lastName: 'User', email: 'admin@test.com' },
        expiresAt: '2025-06-30T23:59:59.999Z',
        isActive: true,
        description: 'Job description',
        updatedAt: new Date().toISOString()
      }
    ],
    totalCount: 1,
    isLoading: false,
    error: null,
    keyword: 'Frontend',
    location: 'Kuala Lumpur',
    jobTypes: [],
    experienceLevel: 'ANY',
  }),
  useBatchJobSavedStatus: () => ({ data: {} }),
  useSaveJob: () => ({
    mutate: vi.fn(),
  }),
  useRemoveSavedJob: () => ({
    mutate: vi.fn(),
  })
}));

vi.mock('@/contexts/authContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    currentUser: { role: 'JOBSEEKER' }
  }),
}));

// 🟡 Don't mock JobCard, Pagination, JobSorting for integration test

describe('JobList Integration', () => {
  const queryClient = new QueryClient();

  const renderJobList = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobList />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it('renders job summary and job card with filtering text', async () => {
    renderJobList();

    expect(screen.getByText(/Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Dev/i)).toBeInTheDocument();
    expect(screen.getByText(/Kuala Lumpur/i)).toBeInTheDocument();
    expect(screen.getByText(/React/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Details/i })).toBeInTheDocument();
  });
});
