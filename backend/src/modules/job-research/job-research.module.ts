import { Module } from '@nestjs/common';
import { JobResearchController } from '@modules/job-research/job-research.controller';
import { JobResearchService } from '@modules/job-research/job-research.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobResearchController],
  providers: [JobResearchService, PrismaService, UsersService],
  exports: [JobResearchService],
})
export class JobResearchModule {}
