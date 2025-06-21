import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

const defaultUseJobsDataReturn = {
    jobs: [],
    isLoading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    recentlyViewedJobs: [],
    keyword: '',
    location: '',
    jobTypes: [],
    experienceLevel: 'ANY',
    sortBy: SortOption.NEWEST,
    setSortBy: vi.fn(),
    handleSearch: vi.fn(),
    handleJobView: vi.fn(),
    handlePageChange: vi.fn(),
    updateSearchParams: vi.fn(),
    resetFilters: vi.fn(),
    refetch: vi.fn(),
}

vi.mock('@/hooks/react-queries/job', () => {
   return {
    useJobsData: vi.fn(() => ({
        ...defaultUseJobsDataReturn
    })),
    useBatchJobSavedStatus: vi.fn(() => ({
        data: {
            data: {
                
            }
        }
    })),
   }
});

vi.mock('@/contexts/authContext', () => ({
    useAuth: vi.fn(() => ({
        currentUser: null,
        isAuthenticated: false,
        login: vi.fn(),
        logout: vi.fn(),
        register: vi.fn(),
    })),
}));

vi.mock('@/components/jobs/JobCard', () => ({
    default: () => <div data-testId="job-card"></div>
}));

vi.mock('@/components/jobs/Pagination', () => ({
    default: () => <div data-testId="pagination"></div>
}));

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import JobList from "@/components/jobs/JobList";
import { useJobsData } from "@/hooks/react-queries/job";
import { SortOption } from "@/contexts/JobsContext";
import { MemoryRouter } from "react-router-dom";

describe('JobListExercise', () => {
    const queryClient = new QueryClient();

    const renderJobList = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <JobList />
                </MemoryRouter>
            </QueryClientProvider>
        )
    }

    beforeAll(() => {
        vi.mocked(useJobsData).mockReturnValue({
            ...defaultUseJobsDataReturn,
            isLoading: true,
            error: null,
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            recentlyViewedJobs: [],
            keyword: '',
            location: '',
            jobTypes: [],
            experienceLevel: 'ANY',
            sortBy: SortOption.NEWEST,
            setSortBy: vi.fn(),
            handleSearch: vi.fn(),
            handleJobView: vi.fn(),
            handlePageChange: vi.fn(),
            updateSearchParams: vi.fn(),
            resetFilters: vi.fn(),
            refetch: vi.fn(),
        })
    })

    it('should return loading spinner when the loading stauts is true', () => {
        renderJobList();

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should return error if there is any error', () => {
        vi.mocked(useJobsData).mockReturnValue({
            ...defaultUseJobsDataReturn,
            isLoading: false,
            error: new Error('Test error')
        })

        renderJobList();

        const heading = screen.getByRole('alert');
        expect(heading).toHaveTextContent('Error');
    });

    it('should return empty state when no jobs match filters', () => {
        vi.mocked(useJobsData).mockReturnValue({
            ...defaultUseJobsDataReturn,
            isLoading: false
        })

        renderJobList();

        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent(/no jobs/i);
    });

    it('should return a list of jobs when the jobs array is provided with data', () => {
        vi.mocked(useJobsData).mockReturnValue({
            ...defaultUseJobsDataReturn,
            jobs: [
                {
                    id: '1',
                    title: 'Test Job',
                    description: 'Test description',
                    companyId: '1',
                    postedById: '1',
                    location: 'Test location',
                    type: 'FULL_TIME',
                    salaryMin: 1000,
                    salaryMax: 2000,
                    requiredSkills: ['Test skill'],
                    experienceLevel: 'BEGINNER',
                    expiresAt: '2025-06-30T23:59:59.999Z',
                    isActive: true,
                    createdAt: '2025-06-21T23:59:59.999Z',
                    updatedAt: '2025-06-21T23:59:59.999Z',
                    company: {
                        name: 'Test Company',
                        logo: 'test-logo.png',
                        industry: 'Test Industry'
                    },
                    postedBy: {
                        firstName: 'Test',
                        lastName: 'User',
                        email: 'test@example.com'
                    }
                }
            ],
            isLoading: false
        });

        renderJobList();

        expect(screen.getByTestId('job-list')).toBeInTheDocument();
    });
});