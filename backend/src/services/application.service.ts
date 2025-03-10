import prisma from "../prisma/client.js"
import { CustomError } from "../types/users.type.js";
import { createApplicationDto, updateApplicationDto } from "../types/application.type.js";

export const fetchAllApplicationsByJobId = async (jobId: string) => {
    const applications = await prisma.jobApplication.findMany({
        where: { jobId }
    });

    if (!applications || applications.length === 0) {
        const error = new Error('Applications not found') as CustomError;
        error.status = 404;
        throw error;
    }

    return applications;
}

export const fetchApplicationById = async (id: string) => {
    const application = await prisma.jobApplication.findUnique({
        where: { id }
    });

    if (!application) {
        const error = new Error('Application not found') as CustomError;
        error.status = 404;
        throw error;
    }

    return application;
}

export const postNewApplication = async (applicationData: createApplicationDto) => {
    // Check if job exists
    const job = await prisma.job.findUnique({
        where: { id: applicationData.jobId }
    });

    if (!job) {
        const error = new Error('Job not found') as CustomError;
        error.status = 404;
        throw error;
    }

    // Check if user already applied for this job
    const existingApplication = await prisma.jobApplication.findFirst({
        where: {
            jobId: applicationData.jobId,
            applicantId: applicationData.applicantId
        }
    });

    if (existingApplication) {
        const error = new Error('You have already applied for this job') as CustomError;
        error.status = 400;
        throw error;
    }

    // Create new application
    const newApplication = await prisma.jobApplication.create({
        data: {
            jobId: applicationData.jobId,
            applicantId: applicationData.applicantId,
            resumeUrl: applicationData.resumeUrl,
            coverLetter: applicationData.coverLetter,
            status: 'PENDING'
        }
    });

    return newApplication;
}

export const updateApplicationById = async (applicationData: updateApplicationDto) => {
    // Check if application exists
    const application = await prisma.jobApplication.findUnique({
        where: { id: applicationData.id }
    });

    if (!application) {
        const error = new Error('Application not found') as CustomError;
        error.status = 404;
        throw error;
    }

    // Update application
    const updatedApplication = await prisma.jobApplication.update({
        where: { id: applicationData.id },
        data: {
            resumeUrl: applicationData.resumeUrl,
            coverLetter: applicationData.coverLetter,
            updatedAt: new Date()
        }
    });

    return updatedApplication;
}

export const deleteExistingApplication = async (id: string) => {
    // Check if application exists
    const application = await prisma.jobApplication.findUnique({
        where: { id }
    });

    if (!application) {
        const error = new Error('Application not found') as CustomError;
        error.status = 404;
        throw error;
    }

    // Delete application
    const deletedApplication = await prisma.jobApplication.delete({
        where: { id }
    });

    return deletedApplication;
}