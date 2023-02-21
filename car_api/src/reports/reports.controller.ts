import { Body, Controller,Param,Post,Get,Query,Patch, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from "../guards/admin.guard";
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
    constructor(private reportsService: ReportsService){
    }

    @Get() 
    getEstimate(@Query() query: GetEstimateDto){
        return this.reportsService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto,@CurrentUser() user: User){
        return this.reportsService.create(body,user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: number,@Body() body: ApproveReportDto,@CurrentUser() user: User ){
        return this.reportsService.changeApproval(id,body.approved,user);
    }
    
}
