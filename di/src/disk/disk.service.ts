import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService){
    }

    getData():string{
        this.powerService.supplyPower(20);
        // console.log"ewa wlaczyla komedie barei~bialas");

        return "Ewa wlaczyla komedie barei~bialas";
    }
}
