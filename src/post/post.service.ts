import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.enetity';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
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

        if(!result) {
            // http status 404 - Not Found
            throw new NotFoundException(`DB에 없는 postId`);
        }

        return result;
    }

}
