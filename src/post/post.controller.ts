import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { WritePostDto } from './dto/write-post.dto';
import { Post as PostEntity } from './entity/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Get('/')
    getPostHello(): string {
        return this.postService.getPostHello();
    }

    @Get('/posts')
    getAll(): Promise<PostEntity[]> {
        return this.postService.getAll();
    }

    @Get('/:postId')
    getPostOne(@Param('postId') postId: number): Promise<PostEntity> {
        return this.postService.getPostOne(postId);
    }

    @Post('/write')
    @HttpCode(201) // created
    createPostTest(@Body() writePost : WritePostDto): Promise<boolean> {
        return this.postService.createPostTest(writePost);
    }

    @Get('/:userName/:postId')
    getPostByUser(@Param('userName') userName: string, @Param('postId') postId: number) {
        console.log(`userName is ${userName}`);
        console.log(`postId is ${postId}`);
    }
}
