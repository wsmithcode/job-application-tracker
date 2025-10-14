import { Controller, Param, Get} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';

@Controller('job-research/:jobResearchId/job-application')
export class JobApplicationController {

    constructor (private readonly jobApplication: JobApplicationService) {}

    @Get()
    async getJobApplicationOfJobResearch(
        @Param('jobResearchId') JobResearchId: string
    ) {
        const jobApplications = await this.jobApplication.getAllJobApplicationOfJobResearch(JobResearchId);

        return {
            success: true,
            data: jobApplications
        }
    }

}