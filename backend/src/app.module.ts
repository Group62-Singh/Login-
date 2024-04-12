import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { FuelRequestsModule } from './fuel-requests/fuel-requests.module';

@Module({
  imports: [AuthModule, FuelRequestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
