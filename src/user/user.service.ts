import { ConflictException, Get, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/signin-user.dto';
import { User } from './entity/user.enetity';
import { SignUpUserDto } from './dto/singup-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getUserHello(): string {
        return 'user controller';
    }

    getAll(): Promise<User[]> {

        return this.userRepository.find(); // User Entity 전체 조회
    }

    async getOne(userId: number): Promise<User> {

        const result = await this.userRepository.findOneBy({
            user_id: userId
        });

        if (!result) {
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 userId`);
        }

        return result;
    }

    async signInTest(signInUser: SignInUserDto): Promise<User> {

        const result = await this.userRepository
            .createQueryBuilder('u')
            .select(['u.user_email, u.user_name, u.user_join_date'])
            .where('u.user_email = :id', { id: signInUser.id })
            .andWhere('u.user_pw = :pw', { pw: signInUser.pw })
            .getRawOne();

        if (!result) {
            // http status 401 - unauthorized
            throw new UnauthorizedException(`아이디 및 비밀번호를 다시 확인해 주세요.`);
        }

        return result;
    }

    async signUpTest(signUpUser: SignUpUserDto): Promise<boolean> {

        const newUser = new User();
        newUser.user_email = signUpUser.id;
        newUser.user_pw = signUpUser.pw;
        newUser.user_name = signUpUser.name;

        const result = await this.userRepository.findOneBy({
            user_email: newUser.user_email
        });

        if (result) {
            // http status 409 - Conflict
            throw new ConflictException(`이미 존재하는 회원입니다.`);
        }
        this.userRepository.save(newUser);

        return true;
    }

    async deleteUser(userId: number): Promise<boolean> {

        const result = await this.userRepository.delete(userId);

        if (!result.affected) { // 영향을 미친 데이터 Row 수
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 userId`);
        }
        return true;
    }

}


