import { Controller, Get } from '@nestjs/common';
import { DiskService } from 'src/disk/disk.service';
import { CpuService } from 'src/cpu/cpu.service';
@Controller('computer')
export class ComputerController {
    constructor(
        private cpuModule: CpuService,
        private diskService: DiskService
    ){

    }

    @Get()
    run():(string|number)[]{
        // console.log(this.cpuModule.compute(1,2));
        // this.diskService.getData();
        return [this.cpuModule.compute(1,2),this.diskService.getData()];
    }
}
