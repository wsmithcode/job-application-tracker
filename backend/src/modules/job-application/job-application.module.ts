import { Module} from "@nestjs/common";
import { JobApplicationService } from "./job-application.service";
import { JobApplicationController} from "@modules/job-application/job-application.controller";
import { PrismaModule} from "@modules/prisma/prisma.module";
import { JobResearchModule} from "@modules/job-research/job-research.module";
import { UsersModule } from "@modules/users/users.module";

@Module({
    imports: [PrismaModule, JobResearchModule, UsersModule],
    controllers: [JobApplicationController],
    providers: [ JobApplicationService ],
})

export class JobApplicationModule {}