import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { InputDataDto } from './dto/input-data.dto';
import { StatisticsService } from './statistics.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Statistics')
@Controller('api/statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @ApiOperation({ summary: 'Get statistics' })
    @ApiResponse({ status: 200, type: InputDataDto })
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    @Post()
    getStatistics(@Body() inputDto: InputDataDto) {
        return this.statisticsService.getStatistics(inputDto);
    }
}
