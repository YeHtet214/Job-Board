// import React from 'react';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import type { UseQueryResult } from '@tanstack/react-query';
// import { Job } from '@/types/job.types';
// import { JobSavedStatus } from '@/types/saved-job.types';
// import { SortOption } from '@/contexts/JobsContext';
// import { UseJobsDataReturn, useJobsData } from '@/hooks/react-queries/job/useJobsData';
// import { useBatchJobSavedStatus } from '@/hooks/react-queries/job/useSavedJobQueries';
// import JobList from '@/components/jobs/JobList';

// // Minimal mock implementation for useBatchJobSavedStatus
// const mockUseBatchJobSavedStatus = (data: Record<string, JobSavedStatus> = {}) => ({
//   data,
//   error: null,
//   isError: false,
//   isLoading: false,
//   isSuccess: true,
//   status: 'success',
//   refetch: vi.fn(),
//   // Add type assertion to handle React Query's complex types
// } as unknown as UseQueryResult<Record<string, JobSavedStatus>>);

// // Mock the auth context
// vi.mock('@/contexts/authContext', () => ({
//   useAuth: vi.fn(() => ({
//     user: null,
//     isAuthenticated: false,
//     login: vi.fn(),
//     logout: vi.fn(),
//     register: vi.fn(),
//   })),
//   AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
// }));

// // Mock the JobCard and Pagination components
// vi.mock('@/components/jobs/JobCard', () => ({
//   default: ({ job }: { job: Job }) => (
//     <div data-testid={`job-card-${job.id}`}>
//       {job.title} at {job.company?.name}
//     </div>
//   ),
// }));

// vi.mock('@/components/jobs/Pagination', () => ({
//   default: () => <div data-testid="pagination">Pagination</div>,
// }));

// // Mock the useJobsData hook
// vi.mock('@/hooks/react-queries/job/useJobsData', () => ({
//   useJobsData: vi.fn(),
//   useBatchJobSavedStatus: vi.fn(),
// }));

// // Helper function to create a mock job
// const createMockJob = (id: string, title: string, companyName: string): Job => ({
//   id,
//   title,
//   description: `${title} description`,
//   companyId: `company-${id}`,
//   postedById: `user-${id}`,
//   location: 'Remote',
//   type: 'FULL_TIME',
//   salaryMin: 80000,
//   salaryMax: 120000,
//   requiredSkills: ['React', 'TypeScript'],
//   experienceLevel: 'MID_LEVEL',
//   isActive: true,
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   company: {
//     name: companyName,
//     logo: '',
//     industry: 'Tech',
//   },
// });

// describe('JobList', () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });

//   const mockJobs = [
//     createMockJob('1', 'Frontend Developer', 'Tech Corp'),
//     createMockJob('2', 'Backend Engineer', 'Data Systems'),
//   ];

//   const defaultMockReturn: UseJobsDataReturn = {
//     jobs: [],
//     isLoading: false,
//     error: null,
//     currentPage: 1,
//     totalPages: 1,
//     totalCount: 0,
//     recentlyViewedJobs: [],
//     keyword: '',
//     location: '',
//     jobTypes: [],
//     experienceLevel: 'ANY',
//     sortBy: SortOption.NEWEST,
//     setSortBy: vi.fn(),
//     handleSearch: vi.fn(),
//     handleJobView: vi.fn(),
//     handlePageChange: vi.fn(),
//     updateSearchParams: vi.fn(),
//     resetFilters: vi.fn(),
//     refetch: vi.fn(),
//   };

//   const renderJobList = () => {
//     return render(
//       <QueryClientProvider client={queryClient}>
//         <JobList />
//       </QueryClientProvider>
//     );
//   };

//   beforeEach(() => {
//     // Reset all mocks before each test
//     vi.clearAllMocks();

//     // Mock the useJobsData hook
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: [],
//       isLoading: false,
//       error: null,
//     });

//     // Mock the useBatchJobSavedStatus hook
//     vi.mocked(useBatchJobSavedStatus).mockReturnValue(
//       mockUseBatchJobSavedStatus()
//     );

//     // Mock the useSearchParams hook
//     vi.mocked(require('react-router-dom')).useSearchParams = () => [new URLSearchParams(), vi.fn()];
//   });

//   it('renders loading state', () => {
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       isLoading: true,
//       jobs: [],
//       totalCount: 0,
//     });

//     renderJobList();

//     expect(screen.getByRole('loading')).toBeInTheDocument();
//   });

//   it('renders error state', () => {
//     const errorMessage = 'Failed to fetch jobs';
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       error: new Error(errorMessage),
//       jobs: [],
//       totalCount: 0,
//     });

//     renderJobList();

//     expect(screen.getByText(/error loading jobs/i)).toBeInTheDocument();
//     expect(screen.getByText(errorMessage)).toBeInTheDocument();
//   });

//   it('renders empty state when no jobs', () => {
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: [],
//       totalCount: 0,
//     });

//     renderJobList();

//     expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         /try adjusting your search or filter criteria to find what you're looking for./i
//       )
//     ).toBeInTheDocument();
//   });

//   it('renders empty state when no jobs match filters', () => {
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: [],
//       keyword: 'nonexistent',
//       location: 'nowhere',
//       jobTypes: ['FULL_TIME'],
//       experienceLevel: 'SENIOR',
//       totalCount: 0,
//     });

//     renderJobList();

//     expect(screen.getByText(/no jobs match your search/i)).toBeInTheDocument();
//     expect(
//       screen.getByText(
//         /try adjusting your search or filter criteria to find what you're looking for./i
//       )
//     ).toBeInTheDocument();
//   });

//   it('renders job list with jobs', () => {
//     // Mock the jobs data
//     const jobsWithMockData = mockJobs.map(job => ({
//       ...job,
//       company: {
//         ...job.company,
//         logo: job.company?.logo || '',
//         industry: job.company?.industry || 'Tech',
//       },
//       requiredSkills: job.requiredSkills || [],
//     }));

//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: jobsWithMockData,
//       totalCount: jobsWithMockData.length,
//     });

//     vi.mocked(useBatchJobSavedStatus).mockReturnValue({
//       data: { '1': 'SAVED', '2': 'NOT_SAVED' },
//       isLoading: false,
//       error: null,
//       refetch: vi.fn(),
//     });

//     renderJobList();

//     // Check if job cards are rendered with correct content
//     jobsWithMockData.forEach((job) => {
//       const jobCard = screen.getByTestId(`job-card-${job.id}`);
//       expect(jobCard).toBeInTheDocument();
//       expect(jobCard).toHaveTextContent(job.title);
//       if (job.company?.name) {
//         expect(jobCard).toHaveTextContent(job.company.name);
//       }
//     });

//     // Check if pagination is rendered
//     expect(screen.getByTestId('pagination')).toBeInTheDocument();
//   });

//   it('shows search summary when filters are applied', () => {
//     const jobsWithMockData = mockJobs.map(job => ({
//       ...job,
//       company: {
//         ...job.company,
//         logo: job.company?.logo || '',
//         industry: job.company?.industry || 'Tech',
//       },
//       requiredSkills: job.requiredSkills || [],
//     }));

//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: jobsWithMockData,
//       keyword: 'developer',
//       location: 'remote',
//       jobTypes: ['FULL_TIME'],
//       experienceLevel: 'MID_LEVEL',
//       totalCount: jobsWithMockData.length,
//     });

//     renderJobList();

//     // Check search summary section
//     const searchSummary = screen.getByText(/showing results for/i).closest('div');
//     expect(searchSummary).toBeInTheDocument();

//     // Check if filter chips are rendered
//     expect(screen.getByText(/developer/i)).toBeInTheDocument();
//     expect(screen.getByText(/remote/i)).toBeInTheDocument();
//     expect(screen.getByText(/full-time/i)).toBeInTheDocument();
//     expect(screen.getByText(/mid level/i)).toBeInTheDocument();

//     // Check if clear all button is rendered
//     expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
//   });

//   it('calls handleJobView when job card is clicked', () => {
//     const jobsWithMockData = mockJobs.map(job => ({
//       ...job,
//       company: {
//         ...job.company,
//         logo: job.company?.logo || '',
//         industry: job.company?.industry || 'Tech',
//       },
//       requiredSkills: job.requiredSkills || [],
//     }));

//     const handleJobView = vi.fn();
//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: jobsWithMockData,
//       handleJobView,
//       totalCount: jobsWithMockData.length,
//     });

//     renderJobList();

//     // Simulate clicking on a job card
//     const firstJobCard = screen.getByTestId(`job-card-${jobsWithMockData[0].id}`);
//     firstJobCard.click();

//     // Verify handleJobView was called with the correct job
//     expect(handleJobView).toHaveBeenCalledWith(jobsWithMockData[0]);
//   });

//   it('renders correct jobs for page 2', () => {
//     const page2Jobs = Array(5).fill(0).map((_, i) =>
//       createMockJob(
//         (i + 6).toString(),
//         `Page 2 Job ${i + 1}`,
//         `Company ${i + 6}`
//       )
//     );

//     vi.mocked(useJobsData).mockReturnValue({
//       ...defaultMockReturn,
//       jobs: page2Jobs,
//       currentPage: 2,
//       totalPages: 2,
//       totalCount: 10,
//     });

//     renderJobList();

//     // Verify pagination shows correct page info
//     expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();

//     // Verify job cards are rendered
//     page2Jobs.forEach((job: Job) => {
//       expect(screen.getByTestId(`job-card-${job.id}`)).toBeInTheDocument();
//     });
//   });
// });
