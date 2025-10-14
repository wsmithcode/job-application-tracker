import { Injectable } from '@nestjs/common';
import { PrismaService} from "@modules/prisma/prisma.service";
import { UsersService} from "@modules/users/users.service";

@Injectable()
export class JobResearchService {

    constructor (
        private readonly prisma: PrismaService,
        private readonly users: UsersService
    ) {}

    async getUserJobResearches(userId: string) {

        await this.users.ensureUserExist(userId);

        const userJobResearchs = await this.prisma.jobResearch.findMany({
            where: { userId: userId }
        });

        return userJobResearchs
    }



}
