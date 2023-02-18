import {Test} from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService',()=>{
    let service: AuthService;
    let users: User[] = [];
    const fakeUsersService: Partial<UsersService> = {
        find: (email: string) => {
            const filteredUsers = users.filter(user=> user.email == email);
            return Promise.resolve(filteredUsers);
        },
        create: (email: string,password: string)=> {
            let id = Math.random() * 100;
            const user: User = {
                id: id,
                email: email,
                password: password
            }; 
            
            users.push(user);
            return Promise.resolve(user);
        },
        findOneByEmail: (email: string) => {
             const filteredUsers = users.filter(user=> user.email == email);
            return Promise.resolve(filteredUsers[0]);
        }
    }

    beforeEach(async()=>{
    
        users = [];
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
        await service.signup("asdf@asdf.com","asdf");
        // fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
          BadRequestException,
        ); 

        // OR but i think this is not working but i did not check 
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
        await service.signup("next@summer.com","mamtenszacunek");

        await expect(service.signin('next@summer.com','password')).rejects.toThrow(BadRequestException);

      });
    
    it("returns user when password is correct",async()=>{
        await service.signup("next@summer.com","mamtenszacunek");
        
        const user = await service.signin("next@summer.com","mamtenszacunek");

        // await expect(service.signin("next@summer.com","mamtenszacunek")).toBeDefined() 
        // could be also
        expect(user).toBeDefined();
    });

});
