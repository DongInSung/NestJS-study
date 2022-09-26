import { IsNumber, IsOptional, IsString } from "class-validator";

export class WritePostDto {

    @IsString()
    postTitle: string;

    @IsString()
    postContent: string;

    @IsNumber()
    @IsOptional()
    userNumber: number;
}