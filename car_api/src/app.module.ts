import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import {User} from "./users/user.entity";
import { Report } from './reports/report.entity';
// import {ConfigModule}
import {ConfigModule} from "@nestjs/config";
// import cookieSession from 'cookie-session';
const cookieSession = require('cookie-session');

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({ // configModule.forRoot is for reading .env file
    type: 'sqlite',
    database: process.env.TESTING ? 'test.sqlite' :'db.sqlite',
    entities: [User,Report],
    synchronize: true
  }),UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
  { // globally scoped pipe
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){ // globally scoped middleware
    consumer.apply(cookieSession({
      keys: ['asdfasfd']
    })).forRoutes('*');
  }
}
