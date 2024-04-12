import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database.module';
import { userProviders } from './user.providers';
import { profileProviders } from 'src/profiles/profile.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders, ...profileProviders],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
