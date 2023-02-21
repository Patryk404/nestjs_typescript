import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";

import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { plainToInstance } from "class-transformer";
interface ClassContructor { // class
    new (...args: any[]):{}
}

export function Serialize(dto:ClassContructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{ // implements satisfy all fields and method from nestInterceptor
    constructor(private dto: any){
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled by the request handler
        // console.log('Im running before the handler',context);

        return next.handle().pipe(
            map((data:any)=>{
                // data.
                // run something before the response is sent out
                // delete(data.password);
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues: true 
                });

            })
        );
    }
}