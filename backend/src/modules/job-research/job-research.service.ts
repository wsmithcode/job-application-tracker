import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';
import { CreateJobResearchDto } from '@modules/job-research/dtos/create-job-research.dto';
import { UpdateJobResearchDto } from '@modules/job-research/dtos/update-job-research.dto';

@Injectable()
export class JobResearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
  ) {}

  async getJobResearches(userId: string) {
    await this.users.ensureUserExist(userId);

    const userJobResearchs = await this.prisma.jobResearch.findMany({
      where: { userId: userId },
    });

    return userJobResearchs;
  }

  async getJobResearchDetails(jobResearchId: string) {
    const jobResearch = await this.prisma.jobResearch.findUnique({
      where: { id: jobResearchId },
    });

    return jobResearch;
  }

  async createJobResearch(
    userId: string,
    createJobResearchDto: CreateJobResearchDto,
  ) {
    const jobResearch = await this.prisma.jobResearch.create({
      data: {
        title: createJobResearchDto.title,
        userId: userId,
      },
    });

    return jobResearch;
  }

  async ensureJobResearchExistById(jobResearchId: string) {
    const jobResearch = await this.getJobResearchDetails(jobResearchId);

    if (!jobResearch) {
      throw new NotFoundException('Job research does not exist');
    }

    return jobResearch;
  }

  async updateJobResearch(
    jobResearchId: string,
    updateJobResearchDto: UpdateJobResearchDto,
  ) {
    await this.ensureJobResearchExistById(jobResearchId);

    const jobResearch = await this.prisma.jobResearch.update({
      where: { id: jobResearchId },
      data: {
        title: updateJobResearchDto.title,
      },
    });

    return jobResearch;
  }

  async deleteJobResearch(jobResearchId: string) {
    await this.ensureJobResearchExistById(jobResearchId);

    await this.prisma.jobResearch.delete({
      where: { id: jobResearchId },
    });
  }
}
