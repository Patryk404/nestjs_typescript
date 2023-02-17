import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException,
    Session,
    UseInterceptors
  } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service'; 
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import {User} from "./user.entity";
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
  @Controller('auth')
  @Serialize(UserDto) // Serialize globally
  export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}
  
    @Post('/signout') 
    signOut(@Session() session: any){
      session.userId = null;
      return "Succesfully signed out"
    }

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //   return this.usersService.findOne(session.userId);
    // }

    @Get('/whoami')
    @UseInterceptors(CurrentUserInterceptor)
    whoAmI(@CurrentUser() user: User){
      return user;
    }

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any){
    //   session.color = color;
    // }

    // @Get('/colors') 
    // getColor(@Session() session: any){
    //   return session.color;
    // }

    @Post('/login') 
    async loginUser(@Body() body: CreateUserDto, @Session() session: any){
      const user = await this.authService.signin(body.email,body.password);
      session.userId = user.id;
      return user;
      // return this.authService.signin(body.email,body.password);
    }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.signup(body.email,body.password);
      session.userId = user.id;
      return user;
    }
  
    @Get('/:id')
    async findUser(@Param('id') id: string) {
      const user = await this.usersService.findOne(parseInt(id));
      if (!user) {
        throw new NotFoundException('user not found');
      }
      return user;
    }
  
    @Get()
    findAllUsers(@Query('email') email: string) {
      return this.usersService.find(email);
    }
  
    @Delete('/:id')
    removeUser(@Param('id') id: string) {
      return this.usersService.remove(parseInt(id));
    }
  
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
      return this.usersService.update(parseInt(id), body);
    }
  }
  