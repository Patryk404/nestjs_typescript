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
         
    }
     
    update(email: string,password: string,){

    }
    
    remove(id:string){

    }
}
