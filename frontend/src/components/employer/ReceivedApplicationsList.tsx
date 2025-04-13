import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, getEmployerStatusBadge } from '@/utils/dashboard.utils';
import { ReceivedApplication } from '@/types/dashboard.types';

interface ReceivedApplicationsListProps {
  applications: ReceivedApplication[];
  onUpdateApplicationStatus?: (application: ReceivedApplication, status: ReceivedApplication['status']) => void;
  emptyStateMessage?: string;
}

const ReceivedApplicationsList: React.FC<ReceivedApplicationsListProps> = ({
  applications,
  onUpdateApplicationStatus,
  emptyStateMessage = "You haven't received any applications yet."
}) => {
  const navigate = useNavigate();

  const statusOptions: { label: string; value: ReceivedApplication['status'] }[] = [
    { label: "Mark as Reviewing", value: "REVIEWING" },
    { label: "Schedule Interview", value: "INTERVIEW" },
    { label: "Reject Application", value: "REJECTED" },
    { label: "Accept Candidate", value: "ACCEPTED" }
  ];

  return (
    <div>
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm truncate">{application.applicantName}</h4>
                    {/* Display 'New' badge based on some condition if isNew doesn't exist */}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Applied for: {application.jobTitle}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">Received {formatDate(application.appliedAt)}</span>
                    {getEmployerStatusBadge(application.status)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/employer/applications/${application.id}`)}
                  >
                    View
                  </Button>
                  
                  {onUpdateApplicationStatus && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary">Update Status</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {statusOptions.map((option) => (
                          <DropdownMenuItem 
                            key={option.value}
                            disabled={application.status === option.value}
                            onClick={() => onUpdateApplicationStatus(application, option.value)}
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{emptyStateMessage}</p>
          <Button 
            onClick={() => navigate('/employer/jobs/create')}
            className="bg-jobboard-darkblue hover:bg-jobboard-darkblue/90"
          >
            Post a Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReceivedApplicationsList;
