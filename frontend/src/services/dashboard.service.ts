import { ApiService } from '@/services/api.service';
import { 
  JobSeekerDashboardData, 
  EmployerDashboardData, 
  JobApplication, 
  SavedJob, 
  RecentActivity,
  PostedJob,
  ReceivedApplication,
  EmployerActivity,
  UpdateApplicationStatusDto
} from '@/types/dashboard.types';

class DashboardService extends ApiService {
  private endpoints = {
    JOBSEEKER_DASHBOARD: '/dashboard/jobseeker',
    EMPLOYER_DASHBOARD: '/dashboard/employer',
    JOBSEEKER_APPLICATIONS: '/dashboard/jobseeker/applications',
    JOBSEEKER_SAVED_JOBS: '/dashboard/jobseeker/saved-jobs',
    JOBSEEKER_ACTIVITY: '/dashboard/jobseeker/activity',
    EMPLOYER_POSTED_JOBS: '/dashboard/employer/jobs',
    EMPLOYER_APPLICATIONS: '/dashboard/employer/applications',
    EMPLOYER_ACTIVITY: '/dashboard/employer/activity',
    APPLICATION_DETAIL: (id: string) => `/dashboard/applications/${id}`,
    SAVED_JOB: (id: string) => `/dashboard/saved-jobs/${id}`,
    POSTED_JOB: (id: string) => `/dashboard/jobs/${id}`,
    COMPANY_PROFILE_COMPLETION: '/dashboard/employer/profile-completion',
  };

  // Job seeker dashboard methods
  public async getJobSeekerDashboardData(): Promise<JobSeekerDashboardData> {
    const response = await this.get<JobSeekerDashboardData>(this.endpoints.JOBSEEKER_DASHBOARD);
    return response.data.data;
  }

  public async getJobSeekerApplications(): Promise<JobApplication[]> {
    const response = await this.get<JobApplication[]>(this.endpoints.JOBSEEKER_APPLICATIONS);
    return response.data.data;
  }

  public async getJobSeekerSavedJobs(): Promise<SavedJob[]> {
    const response = await this.get<SavedJob[]>(this.endpoints.JOBSEEKER_SAVED_JOBS);
    return response.data.data;
  }

  public async getJobSeekerActivity(): Promise<RecentActivity[]> {
    const response = await this.get<RecentActivity[]>(this.endpoints.JOBSEEKER_ACTIVITY);
    return response.data.data;
  }

  public async removeSavedJob(id: string): Promise<void> {
    await this.delete<void>(this.endpoints.SAVED_JOB(id));
  }

  public async withdrawApplication(id: string): Promise<void> {
    await this.delete<void>(this.endpoints.APPLICATION_DETAIL(id));
  }

  // Employer dashboard methods
  public async getEmployerDashboardData(): Promise<EmployerDashboardData> {
    const response = await this.get<EmployerDashboardData>(this.endpoints.EMPLOYER_DASHBOARD);
    return response.data.data;
  }

  public async getEmployerPostedJobs(): Promise<PostedJob[]> {
    const response = await this.get<PostedJob[]>(this.endpoints.EMPLOYER_POSTED_JOBS);
    return response.data.data;
  }

  public async getEmployerApplications(): Promise<ReceivedApplication[]> {
    const response = await this.get<ReceivedApplication[]>(this.endpoints.EMPLOYER_APPLICATIONS);
    return response.data.data;
  }

  public async getEmployerActivity(): Promise<EmployerActivity[]> {
    const response = await this.get<EmployerActivity[]>(this.endpoints.EMPLOYER_ACTIVITY);
    return response.data.data;
  }

  public async updateApplicationStatus(id: string, statusData: UpdateApplicationStatusDto): Promise<ReceivedApplication> {
    const response = await this.put<ReceivedApplication>(
      this.endpoints.APPLICATION_DETAIL(id), 
      statusData
    );
    return response.data.data;
  }

  public async deletePostedJob(id: string): Promise<void> {
    await this.delete<void>(this.endpoints.POSTED_JOB(id));
  }

  public async getCompanyProfileCompletion(): Promise<{ complete: boolean; percentage: number }> {
    const response = await this.get<{ complete: boolean; percentage: number }>(
      this.endpoints.COMPANY_PROFILE_COMPLETION
    );
    return response.data.data;
  }
}

export default new DashboardService();
