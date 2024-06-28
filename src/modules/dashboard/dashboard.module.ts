import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsecasesModule } from 'src/usecases/usecases.module';

@Module({
  imports: [UsecasesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
