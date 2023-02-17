import {Test} from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

it("can create an instance of auth service",async () => {
    // Create a fake copy of the users service
    const fakeUsersService = {
        find: (email: string) => Promise.resolve([]),
        create: (email: string,password: string)=> Promise.resolve({
            id: 1,
            email: email,
            password: password
        }),

    }

    const module = await Test.createTestingModule({
        providers: [AuthService,{
            provide: UsersService,
            useValue: fakeUsersService
        }]
    }).compile();
    
    const service = module.get(AuthService);
    
    expect(service).toBeDefined();
});