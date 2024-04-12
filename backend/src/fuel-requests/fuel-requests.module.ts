import { Module } from '@nestjs/common';
import { FuelRequestsService } from './fuel-requests.service';
import { FuelRequestsController } from './fuel-requests.controller';
import { fuelRequestProviders } from './fuel-request.providers';
import { userProviders } from 'src/users/user.providers';
import { DatabaseModule } from 'src/database.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [FuelRequestsController],
  providers: [FuelRequestsService, ...fuelRequestProviders, ...userProviders],
})
export class FuelRequestsModule {}
