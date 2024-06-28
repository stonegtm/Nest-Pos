import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetTopSalesDto } from './dto/get-list-sale';
import { GetTopSalesLineDto } from './dto/get-top-sale.dto';
import { JwtAuthGuard } from '../guards/jwt-guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @Get()
  // findAll() {
  //   return this.dashboardService.findAll();
  // }
  @Get('top-sales')
  getListSale(@Query() query: GetTopSalesDto) {
    return this.dashboardService.getTopSales(query);
  }
  @Get('top-sales-line')
  @UseGuards(JwtAuthGuard)
  getTopSaleLine(@Query() query: GetTopSalesLineDto) {
    return this.dashboardService.getTopSaleLine(query);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}
