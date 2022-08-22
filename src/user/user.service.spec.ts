import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.enetity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // When it comes to unit testing an application, we usually want to avoid making a database connection,
  // keeping our test suites independent and their execution process as fast as possible. 
  const mockRepository = {
    getOnea: jest.fn(() => console.log("heelo"))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
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
