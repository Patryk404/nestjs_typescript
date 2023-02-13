import { Controller,Post,Get,Patch,Delete,Body,Param,Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email,body.password);
    } 

    @Get('/:id')
    async findUser(@Param('id') id: number){
        return this.userService.findOne(id);
    }

    @Get()
    async findAllUser(){

    }

    @Patch('/:id')
    updateUser(@Body() body: CreateUserDto){

    }

    @Delete('/:id')
    removeUser(){

    }
 
}
