import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.enetity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // getRepositoryToken => This function generates an injection token for an Entity or Repository
          provide: getRepositoryToken(User),
          useValue: mockRepository 
        }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
