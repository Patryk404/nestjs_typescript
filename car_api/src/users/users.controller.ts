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
    async findAllUser(@Query('email') email: string){
        const users = await this.userService.find(email);
        return users;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() body: CreateUserDto){
        const user = await this.userService.update(body.email,body.password,id);
        return user;
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: number){
        return await this.userService.remove(id); 
    }
 
}
