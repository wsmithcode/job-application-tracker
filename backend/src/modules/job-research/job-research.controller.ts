import { Controller, Param, Body, Get, Post, Put, Delete} from '@nestjs/common'
import { JobResearchService } from './job-research.service';
import {CurrentUser} from "@/decorators/current-user.decorator";
import { User } from '../../entities/user.entity'

@Controller('job-research')
export class JobResearchController {
    constructor (private readonly jobReasearch: JobResearchService) {}

    @Get()
    async test(
        @CurrentUser() user: User
    ) {
        const userId = user.id;
        const userJobResearches = await this.jobReasearch.getUserJobResearches(userId);
        return {
            success: true,
            data: userJobResearches
        }
    }


}