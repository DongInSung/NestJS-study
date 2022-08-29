import { IsEmail, IsString } from 'class-validator';

export class SignInUserDto {
    @IsEmail()
    readonly userEmail: string;

    @IsString()
    readonly userPw: string;
}