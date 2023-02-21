import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { User } from './users/user.entity';
// import { Report } from './reports/report.entity';

import {ConfigModule,ConfigService} from "@nestjs/config";
const cookieSession = require('cookie-session');
const dbConfig = require("../ormconfig.js");
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  TypeOrmModule.forRoot(dbConfig),
  UsersModule, ReportsModule],
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
  constructor(private configService: ConfigService){

  }
  configure(consumer: MiddlewareConsumer){ // globally scoped middleware
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
