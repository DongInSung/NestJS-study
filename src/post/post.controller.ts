import { Controller, Get, Param } from '@nestjs/common';
import { Post } from './entity/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Get('/')
    getPostHello(): string {
        return this.postService.getPostHello();
    }

    @Get('/posts')
    getAll(): Promise<Post[]> {
        return this.postService.getAll();
    }

    @Get('/:postId')
    getPostOne(@Param('postId') postId: number): Promise<Post> {
        return this.postService.getPostOne(postId);
    }

    @Get('/:userName/:postId')
    getPostByUser(@Param('userName') userName: string, @Param('postId') postId: number) {
        console.log(`userName is ${userName}`);
        console.log(`postId is ${postId}`);
    }
}
