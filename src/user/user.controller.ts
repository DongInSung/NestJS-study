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

        return this.userService.getOne(userId);
    }

    @Delete('/:userId')
    async deleteUser(@Param("userId") userId: number): Promise<boolean> {
        
        return await this.userService.deleteUser(userId);
    }

    @Post('/signin')
    async signInTest(@Body() signInUser: SignInUserDto): Promise<User> {

        return this.userService.signInTest(signInUser);
    }

    @Post('/signup')
    @HttpCode(201) // created
    async signUpTest(@Body() signUpUser: SignUpUserDto): Promise<boolean> {

        return this.userService.signUpTest(signUpUser);
    }

}
