import { Injectable } from '@nestjs/common';
import { PrismaService} from "@modules/prisma/prisma.service";
import { JobResearchService } from '../job-research/job-research.service'

@Injectable()
export class JobApplicationService {

    constructor (
        private readonly prisma: PrismaService,
        private readonly jobResearch: JobResearchService
    ) {}

    async getAllJobApplicationOfJobResearch(jobResearchId: string) {
        await this.jobResearch.ensureJobResearchExistById(jobResearchId);

        const jobApplications = await this.prisma.jobApplication.findMany({
            where: {
                jobResearchId: jobResearchId,
            }
        })

        return jobApplications;

    }

}