import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateJobApplicationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly company: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly location: string;

  @IsNumber()
  @IsOptional()
  public readonly travelTime: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly link: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly note: string;
}
