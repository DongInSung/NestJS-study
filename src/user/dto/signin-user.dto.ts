import { IsEmail, IsString } from 'class-validator';

export class SignInUserDto {
    @IsEmail()
    readonly id: string;

    @IsString()
    readonly pw: string;
}