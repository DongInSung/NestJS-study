import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entity/user.enetity'
import { UserService } from './user.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/singup-user-dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  
  // When it comes to unit testing an application, we usually want to avoid making a database connection,
  // keeping our test suites independent and their execution process as fast as possible. 
  const mockRepository = () => ({

    // fn => Creates a mock function. Optionally takes a mock implementation.
    
    find: jest.fn( () => {
    }),

    findOneBy: jest.fn((user) => {

      if (user.user_id) { // user.service => getOne
        const testUser: User = new User();
        testUser.user_id = user.user_id;
        return testUser;
      } 
      else if (user.user_email) { // user.service => signUpTest
        return false;
      }
    }),

    save: jest.fn(() => {
      console.log("회원가입 완료");
    })

  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          // getRepositoryToken => This function generates an injection token for an Entity or Repository
          provide: getRepositoryToken(User),
          useValue: mockRepository()
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return 10', async () => {
    const userId : number = 10;
    const result : User = await controller.getOne(userId);
    //console.log(result);
    expect(result.user_id).toEqual(10);
  });

  it('shoud return true', async () => {

    const newUser : SignUpUserDto = {
      userEmail: "test@gmail.com",
      userName: "test",
      userPw: "test"
    }
    const result = await controller.signUpTest(newUser);
    expect(result).toBe(true);
  });

});
