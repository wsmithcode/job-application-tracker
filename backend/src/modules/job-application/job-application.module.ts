import { Module} from "@nestjs/common";
import { JobApplicationService } from "./job-application.service";
import { JobApplicationController} from "@modules/job-application/job-application.controller";
import { PrismaModule} from "@modules/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [JobApplicationController],
    providers: [ JobApplicationService ],
})

export class JobApplicationModule {}