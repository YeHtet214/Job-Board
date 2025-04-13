import { useState, useEffect, useCallback } from 'react';
import { Job } from '@/types/job.types';
import { useJobs } from './useJobQueries';
import { SortOption } from '@/contexts/JobsContext';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

interface UseJobsDataParams {
  initialKeyword?: string;
  initialLocation?: string;
  initialJobTypes?: string[];
  initialExperienceLevel?: string;
  initialPage?: number;
  initialSortBy?: SortOption;
}

interface UseJobsDataReturn {
  jobs: Job[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  recentlyViewedJobs: Job[];
  keyword: string;
  location: string;
  jobTypes: string[];
  experienceLevel: string;
  sortBy: SortOption;
  setKeyword: (keyword: string) => void;
  setLocation: (location: string) => void;
  handleJobTypeChange: (type: string) => void;
  setExperienceLevel: (level: string) => void;
  setSortBy: (option: SortOption) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleJobView: (job: Job) => void;
  handlePageChange: (page: number) => void;
  resetFilters: () => void;
  refetch: () => void;
}

/**
 * A comprehensive hook for job search functionality
 * 
 * This hook handles all job search state, actions, and data fetching in one place.
 * It can be used directly in components or within JobsContext.
 */
export const useJobsData = ({
  initialKeyword = '',
  initialLocation = '',
  initialJobTypes = [],
  initialExperienceLevel = 'ANY',
  initialPage = 1,
  initialSortBy = SortOption.NEWEST
}: UseJobsDataParams = {}): UseJobsDataReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [keyword, setKeyword] = useState<string>(initialKeyword);
  const [location, setLocation] = useState<string>(initialLocation);
  const [jobTypes, setJobTypes] = useState<string[]>(initialJobTypes);
  const [experienceLevel, setExperienceLevel] = useState<string>(initialExperienceLevel);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);
  const [recentlyViewedJobs, setRecentlyViewedJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Limit per page
  const ITEMS_PER_PAGE = 10;

  // Debounced versions of the filter states for smoother search experience
  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedLocation = useDebounce(location, 500);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedKeyword) params.append('keyword', debouncedKeyword);
    if (debouncedLocation) params.append('location', debouncedLocation);
    if (experienceLevel && experienceLevel !== 'ANY') params.append('experienceLevel', experienceLevel);
    if (currentPage > 1) params.append('page', currentPage.toString());
    if (sortBy !== SortOption.NEWEST) params.append('sortBy', sortBy);

    jobTypes.forEach(type => params.append('jobTypes', type));

    setSearchParams(params, { replace: true });

    // Auto-search when debounced values change
    if ((debouncedKeyword !== searchParams.get('keyword')) || 
        (debouncedLocation !== searchParams.get('location'))) {
      refetch();
    }
  }, [debouncedKeyword, debouncedLocation, jobTypes, experienceLevel, currentPage, sortBy, setSearchParams]);

  // Use the enhanced useJobs hook for data fetching
  const { data, isLoading, error, refetch } = useJobs({
    keyword: debouncedKeyword,
    location: debouncedLocation,
    jobTypes,
    experienceLevel,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sortBy
  }, true);

  // Extract values from the response
  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 0;

  // Update total count when data changes
  useEffect(() => {
    if (data?.totalCount !== undefined) {
      setTotalCount(data.totalCount);
    }
  }, [data?.totalCount]);

  // Load recently viewed jobs from localStorage
  useEffect(() => {
    const recentlyViewed = localStorage.getItem('recentlyViewedJobs');
    if (recentlyViewed) {
      try {
        const parsed = JSON.parse(recentlyViewed);
        setRecentlyViewedJobs(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Error parsing recently viewed jobs:', e);
        setRecentlyViewedJobs([]);
      }
    }
  }, []);

  const handleJobTypeChange = useCallback((type: string) => {
    setJobTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
    // Reset to first page when changing filters
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Reset to first page when searching
    setCurrentPage(1);
    // Trigger refetch with the updated filters
    refetch();
  }, [refetch]);
  
  const handleJobView = useCallback((job: Job) => {
    setRecentlyViewedJobs(prev => {
      const updatedRecentlyViewed = [job, ...prev.filter(j => j.id !== job.id)].slice(0, 4);
      localStorage.setItem('recentlyViewedJobs', JSON.stringify(updatedRecentlyViewed));
      return updatedRecentlyViewed;
    });
  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // React Query will automatically refetch when the page changes
    window.scrollTo(0, 0);
  }, []);

  const resetFilters = useCallback(() => {
    setKeyword('');
    setLocation('');
    setJobTypes([]);
    setExperienceLevel('ANY');
    setSortBy(SortOption.NEWEST);
    setCurrentPage(1);
  }, []);

  return {
    jobs,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    recentlyViewedJobs,
    keyword,
    location,
    jobTypes,
    experienceLevel,
    sortBy,
    setKeyword,
    setLocation,
    handleJobTypeChange,
    setExperienceLevel,
    setSortBy,
    handleSearch,
    handleJobView,
    handlePageChange,
    resetFilters,
    refetch
  };
};
