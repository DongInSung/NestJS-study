import { Get, Injectable, Req } from '@nestjs/common';
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

    getOne(userId: number): Promise<User> {

        return this.userRepository.findOneBy({
            user_id: userId
        });
    }

    async signInTest(signInUser: SignInUserDto): Promise<User> {

        const userData = await this.userRepository
            .createQueryBuilder('u')
            .select(['u.user_email, u.user_name, u.user_join_date'])
            .where('u.user_email = :id', { id: signInUser.id })
            .andWhere('u.user_pw = :pw', { pw: signInUser.pw })
            .getRawOne();

        return userData;
    }

    async signUpTest(signUpUser: SignUpUserDto): Promise<boolean> {

        const newUser = new User();
        newUser.user_email = signUpUser.id;
        newUser.user_pw = signUpUser.pw;
        newUser.user_name = signUpUser.name;

        const result = await this.userRepository.findOneBy({
            user_email: newUser.user_email
        });

        if(result) {
            return false;
        }
        else {
            this.userRepository.save(newUser);
            return true;
        }
    }

    async deleteUser(id: number): Promise<number> {
        
        const result = await this.userRepository.delete(id);

        return result.affected; // 영향을 미친 데이터 Row 수
    }

}


