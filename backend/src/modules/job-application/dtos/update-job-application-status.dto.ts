import { IsEnum, IsNotEmpty } from 'class-validator';
import { JobApplicationStatus } from '@/entities/job-application.entity';

export class UpdateJobApplicationStatusDto {
  @IsNotEmpty()
  @IsEnum(JobApplicationStatus)
  public readonly status: JobApplicationStatus;
}
