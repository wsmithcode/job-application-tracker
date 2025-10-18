import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { JobResearchService } from '../job-research/job-research.service';
import { CreateJobApplicationDto } from '@modules/job-application/dtos/create-job-application.dto';
import { JobApplicationStatus } from '@/entities/job-application.entity';
import { UpdateJobApplicationDto } from '@modules/job-application/dtos/update-job-application.dto';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobResearch: JobResearchService,
  ) {}

  async getAllJobApplicationOfJobResearch(jobResearchId: string) {
    await this.jobResearch.ensureJobResearchExistById(jobResearchId);

    const jobApplications = await this.prisma.jobApplication.findMany({
      where: {
        jobResearchId: jobResearchId,
      },
    });

    return jobApplications;
  }

  async getJobApplicationDetail(
    jobApplicationId: string,
    jobResearchId: string,
  ) {
    const jobApplication = await this.prisma.jobApplication.findUnique({
      where: {
        id: jobApplicationId,
        jobResearchId: jobResearchId,
      },
    });

    if (!jobApplication) {
      throw new NotFoundException(
        `Job Application with id ${jobResearchId} does not exist`,
      );
    }

    return jobApplication;
  }

  async createJobApplication(
    jobResearchId: string,
    createJobApplicationDto: CreateJobApplicationDto,
  ) {
    await this.jobResearch.ensureJobResearchExistById(jobResearchId);

    const jobApplicationStatus = JobApplicationStatus.APPLIED;
    const createJobApplication = await this.prisma.jobApplication.create({
      data: {
        jobResearchId: jobResearchId,
        title: createJobApplicationDto.title,
        company: createJobApplicationDto.company,
        location: createJobApplicationDto?.location,
        travelTime: createJobApplicationDto?.travelTime,
        link: createJobApplicationDto?.link,
        note: createJobApplicationDto?.note,
        status: jobApplicationStatus,
      },
    });

    return createJobApplication;
  }

  async updateJobApplication(
    jobApplicationId: string,
    JobResearchId: string,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    await this.getJobApplicationDetail(jobApplicationId, JobResearchId);

    const updateJobApplication = await this.prisma.jobApplication.update({
      where: {
        id: jobApplicationId,
        jobResearchId: JobResearchId,
      },
      data: {
        jobResearchId: JobResearchId,
        title: updateJobApplicationDto.title,
        company: updateJobApplicationDto.company,
        location: updateJobApplicationDto?.location,
        travelTime: updateJobApplicationDto?.travelTime,
        link: updateJobApplicationDto?.link,
        note: updateJobApplicationDto?.note,
        status: updateJobApplicationDto.status,
      },
    });

    return updateJobApplication;
  }

  async deleteJobApplication(jobApplicationId: string, jobResearchId: string) {
    await this.getJobApplicationDetail(jobApplicationId, jobResearchId);

    await this.prisma.jobApplication.delete({
      where: {
        id: jobApplicationId,
        jobResearchId: jobResearchId,
      },
    });
  }
}
