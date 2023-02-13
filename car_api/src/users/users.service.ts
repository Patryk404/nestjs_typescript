import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from "./user.entity";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private repo: Repository<User>){
    }  

    create(email: string, password: string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);
    }
    
    async findOne(id: number){
        const user = await this.repo.findOne({where: {id: id}}) ;
        return user;
    }
    
    async find(email: string){
        const users = await this.repo.findBy({email: email});
        return users;
    }
     
    async update(email: string,password: string,id: number){
        const user = await this.repo.findOne({where: {
            id: id
        }});  
        user.email = email;
        user.password = password;
        await this.repo.save(user);
        return user;
    }
    
    async remove(id:number){
        const user = await this.repo.findOne({where: {id: id}});
        await this.repo.delete(user);
        return {
            message: `Succesfully deleted user ${id}`
        };
    }
}
