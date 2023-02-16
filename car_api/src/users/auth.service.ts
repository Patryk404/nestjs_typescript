import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "./user.entity";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService{
    constructor(
        private userService : UsersService
    ){
    }

    async signin(email: string, password: string){
        const user = await this.userService.findOneByEmail(email) as User ;
        if(!user){
            throw new NotFoundException("User not found");
        }
        const salt = user.password.split('.')[0];  
        
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        
        if(result === user.password){ 
            return user;
        }
        else{
            throw new BadRequestException('bad password');
        }
    }

    async signup(email: string, password: string){
        // see if email is in use
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('User with this email already exist');
        }
        
        // generate a salt 
        const salt = randomBytes(8).toString('hex');
        
        // Hash the salt and the password together
        const hash = (await scrypt(password,salt,32)) as Buffer;
    
        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex'); 
        
        // create a new user and save it
        const user = await this.userService.create(email,result);

        // return the user
        return user;
    }
}