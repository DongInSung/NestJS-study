import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entity/user.enetity'
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          // getRepositoryToken => This function generates an injection token for an Entity or Repository
          provide: getRepositoryToken(User),
          // fn => Creates a mock function. Optionally takes a mock implementation.
          useValue: jest.fn()
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
