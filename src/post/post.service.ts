import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.enetity';
import { Repository } from 'typeorm';
import { WritePostDto } from './dto/write-post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getPostHello(): string {
        console.log("hello");
        return 'hello';
    }

    getAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async getPostOne(postId: number): Promise<Post> {

        const result = await this.postRepository.findOneBy({
            post_id: postId
        });

        if (!result) {
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 postId`);
        }

        return result;
    }

    async createPostTest(writePost: WritePostDto): Promise<boolean> {

        //console.log(writePost);

        const newPost = new Post();
        newPost.post_title = writePost.postTitle;
        newPost.post_content = writePost.postContent;
        newPost.user_id = writePost.userNumber;

        try {
            await this.postRepository.save(newPost);
        }
        catch (err) {
            // 외래키 제약 (null이 아닌 DB에 없는 userId일 경우)
            // http status 404 - Not Found
            throw new NotFoundException("존재하지 않는 회원입니다.");
        }

        return true;
    }
}
