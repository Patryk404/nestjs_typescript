import { Controller, Get} from "@nestjs/common";
@Controller(
) // decorator
export class AppController {
    @Get('/asdf')
    getRootRoute(){
        return '<h1>hi there!</h1>';
    }


    @Get('/bye')
    getByeThere(){
        return '<h1>bye there</h1>'
    }
}