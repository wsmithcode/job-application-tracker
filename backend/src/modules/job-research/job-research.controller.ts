import { Controller, Param, Body, Get, Post, Put, Delete} from '@nestjs/common'
import { JobResearchService } from './job-research.service';
import {CurrentUser} from "@/decorators/current-user.decorator";
import { User } from '../../entities/user.entity'
import { CreateJobResearchDto} from "@modules/job-research/dtos/create-job-research.dto";
import {UpdateJobResearchDto} from "@modules/job-research/dtos/update-job-research.dto";

@Controller('job-research')
export class JobResearchController {
    constructor (private readonly jobResearch: JobResearchService) {}

    @Get()
    async getJobResearches(
        @CurrentUser() user: User
    ) {
        const userId = user.id;
        const userJobResearches = await this.jobResearch.getJobResearches(userId);
        return {
            success: true,
            data: userJobResearches
        }
    }

    @Get(':id')
    async getJobResearchDetails(@Param('id') id: string) {
        const jobResearch = await this.jobResearch.getJobResearchDetails(id);
        return {
            success: true,
            data: jobResearch
        }
    }

    @Post()
    async createJobResearch(
        @Body() createJobResearchDto: CreateJobResearchDto,
        @CurrentUser() user: User
    ) {
        const userId = user.id;
        const jobResearch = await this.jobResearch.createJobResearch(userId, createJobResearchDto);
        return {
            success: true,
            message: 'Job Research created successfully',
            data: jobResearch
        }
    }

    @Put(':id')
    async updateJobResearch(
        @Param('id') id: string,
        @Body() updateJobResearchDto: UpdateJobResearchDto,
    ) {
        const jobResearch = await this.jobResearch.updateJobResearch(id, updateJobResearchDto);
        return {
            success: true,
            message: 'Job Research Updated successfully',
            data: jobResearch
        }
    }

    @Delete(':id')
    async deleteJobResearch(
        @Param('id') id: string
    ) {
        await this.jobResearch.deleteJobResearch(id);
        return {
            success: true,
            message: 'Job Research deleted successfully'
        }
    }
}