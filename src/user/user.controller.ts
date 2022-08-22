import { Body, Controller, Get, HttpCode, Param, Post, Req, Res, Redirect, Query, Delete, MethodNotAllowedException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundException } from '@nestjs/common';
import { SignInUserDto } from './dto/signin-user.dto';
import { User } from './entity/user.enetity';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/singup-user-dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/')
    getUserHello(): string {
        return this.userService.getUserHello();
    }

    @Get('/users')
    getAll(): Promise<User[]> {

        return this.userService.getAll();
    }

    @Get('/:userId')
    async getOne(@Param("userId") userId: number): Promise<User> {

        const result = await this.userService.getOne(userId);
        if (!result) {
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 userId`);
        }
        return result;
    }

    @Delete('/:userId')
    async deleteUser(@Param("userId") id: number): Promise<boolean> {

        const result = await this.userService.deleteUser(id);
        if (!result) {
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 userId`);
        }
        return true;
    }

    @Post('/signin')
    async signInTest(@Body() signInUser: SignInUserDto): Promise<User> {

        const result = await this.userService.signInTest(signInUser);
        if (!result) {
            // http status 401 - unauthorized
            throw new UnauthorizedException(`아이디 및 비밀번호를 다시 확인해 주세요.`);
        }
        return result;
    }

    @Post('/signup')
    @HttpCode(201) // created
    async signUpTest(@Body() signUpUser: SignUpUserDto): Promise<boolean> {

        const result: boolean = await this.userService.signUpTest(signUpUser);
        if (!result) {
            // http status 409 - Conflict
            throw new ConflictException(`이미 존재하는 회원입니다.`);
        }
        return result;
    }

}
