import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from '@modules/job-application/dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from '@modules/job-application/dtos/update-job-application.dto';

@Controller('job-research/:jobResearchId/job-application')
export class JobApplicationController {
  constructor(private readonly jobApplication: JobApplicationService) {}

  @Get()
  async getJobApplicationOfJobResearch(
    @Param('jobResearchId') JobResearchId: string,
  ) {
    const jobApplications =
      await this.jobApplication.getAllJobApplicationOfJobResearch(
        JobResearchId,
      );

    return {
      success: true,
      data: jobApplications,
    };
  }

  @Get(':id')
  async getJobApplicationDetail(
    @Param('jobResearchId') JobResearchId: string,
    @Param('id') id: string,
  ) {
    const jobApplication = await this.jobApplication.getJobApplicationDetail(
      id,
      JobResearchId,
    );

    return {
      success: true,
      data: jobApplication,
    };
  }

  @Post()
  async createJobApplication(
    @Param('jobResearchId') JobResearchId: string,
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ) {
    const jobApplicationCreated =
      await this.jobApplication.createJobApplication(
        JobResearchId,
        createJobApplicationDto,
      );
    return {
      success: true,
      message: 'Account created successfully',
      data: jobApplicationCreated,
    };
  }

  @Put(':id')
  async updateJobApplicaton(
    @Param('id') id: string,
    @Param('jobResearchId') JobResearchId: string,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    const jobApplicationUpdate = await this.jobApplication.updateJobApplication(
      id,
      JobResearchId,
      updateJobApplicationDto,
    );
    return {
      success: true,
      message: `Job applicatio with id ${id} is updated successfully`,
      data: jobApplicationUpdate,
    };
  }

  @Delete(':id')
  async deleteJobApplication(
    @Param('id') id: string,
    @Param('jobResearchId') JobResearchId: string,
  ) {
    await this.jobApplication.deleteJobApplication(id, JobResearchId);

    return {
      success: true,
      message: `Job application deleted successfully`,
    };
  }
}
