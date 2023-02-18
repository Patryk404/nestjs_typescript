import {INestApplication, ValidationPipe} from "@nestjs/common";
const cookieSession = require('cookie-session');

export const starter = (app: INestApplication)=>{
    app.use(cookieSession({
        keys: ['asdfasfd']
    }));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));
};