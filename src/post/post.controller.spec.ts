import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],  
    }).compile();

    controller = module.get<PostController>(PostController);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
