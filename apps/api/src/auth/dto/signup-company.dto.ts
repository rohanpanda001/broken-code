import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupCompanyDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  companyName: string;

  @IsString()
  name?: string;
}
