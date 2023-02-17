import {Test} from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService',()=>{
    let service: AuthService;
    const fakeUsersService: Partial<UsersService> = {
        find: (email: string) => Promise.resolve([]),
        create: (email: string,password: string)=> Promise.resolve({
            id: 1,
            email: email,
            password: password
        } as User),
        findOneByEmail: (email: string) => Promise.resolve(null)
    }

    beforeEach(async()=>{
    
        const module = await Test.createTestingModule({
            providers: [AuthService,{
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile();
        
        service = module.get(AuthService);
    }); 
    
    
    it("can create an instance of auth service",async () => {
        expect(service).toBeDefined();
    });

    it("creates a new user with a salted and hashed password",async()=>{
        const user = await service.signup('asdf@asdf.com',"hello");
        expect(user.password).not.toEqual('hello');
        const [salt,hash] = user.password.split('.'); 
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
          BadRequestException,
        ); 

        // or 
        /* 
        try{
            await service.signup('asdf@asdf.com','asdf');
        }
        catch(err){
            done();
        }
        */
      });

    it("throws if signin is called with an unused email",async()=>{
        await expect(
            service.signin('dfghjgfhksd@dgjnksdhfjk.com',"numeruno")
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        fakeUsersService.findOneByEmail = (email: string) => Promise.resolve({
            id: 1,
            email: "laskdjf@alskdfj.com",
            password: "fakepassword"  // should be hash here but let's say this is hash
        } as User);
        await expect(
          service.signin('laskdjf@alskdfj.com', 'passowrd'),
        ).rejects.toThrow(BadRequestException);
      });

});
