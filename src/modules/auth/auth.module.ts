import { Module } from '@nestjs/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsecasesModule],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule { }
