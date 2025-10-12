import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, { message: 'Username must be between 5 and 20 caracters' })
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  public readonly username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  @Length(5, 50, { message: 'Email must be between 5 and 50 caracters' })
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 60, { message: 'Password must be between 8 and 60 caracters' })
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  public readonly password: string;
}
