import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please fill your email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @IsNotEmpty({ message: 'The password is required' })
  password: string;
  name: string;
}
