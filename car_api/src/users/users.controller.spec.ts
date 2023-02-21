import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
   
  beforeEach(async () => {
    fakeUsersService={
      findOne: (id:number)=>{
        return Promise.resolve({
          id: id,
          email: "user@user.com",
          password: "user"
        } as User);
      },
      find: (email: string)=>{
        return Promise.resolve([{
          id: 2,
          email: email,
          password: "user"
        } ] as User[]);
      }
    };
    fakeAuthService={
      signin: (email: string,password: string)=>{
        return Promise.resolve({id: 1, email: email,password: password} as User);
      },
      signup: (email: string,password: string)=>{
        return Promise.resolve({id: 1, email: email,password: password} as User);
      } 
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll Users returns a list of users with the given email',async()=>{
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1); 
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id',async()=>{
    const user = await controller.findUser(1);
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });
  
  it('findUser returns error when user is not found',async()=>{
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
  });
   
  it("signin updates session object and returns user",async()=>{
    const body = {
      email: "kernel@dev.com",
      password: "kernel"
    };
    const session = {userId: null}; 
    const user = await controller.loginUser(body,session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1); 
  });

  it('check if sign out working',async()=>{
    const session = {userId:  1};
    await controller.signOut(session);
    expect(session.userId).toBeNull();
  });
});
