import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateJobResearchDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 100, {
    message: 'Title must be between 8 and 100 characters long',
  })
  title: string;
}
