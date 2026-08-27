import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
