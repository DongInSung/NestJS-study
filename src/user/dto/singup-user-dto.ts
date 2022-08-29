import { IsEmail, IsString, Length } from 'class-validator';


export class SignUpUserDto {

    @IsEmail()
    readonly userEmail: string;

    @IsString()
    readonly userName: string;
    
    @IsString()
    //@Length(8, 16)  // 8 ~ 16 자리 길이 제한
    readonly userPw: string;
}