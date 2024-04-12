import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateFuelRequestDto } from './dto/create-fuel-request.dto';
import { UpdateFuelRequestDto } from './dto/update-fuel-request.dto';
import { FuelRequest } from './fuel-request.entity';
import { FUEL_REQUEST_REPOSITORY } from './fuel-request.providers';
import { USER_REPOSITORY } from 'src/users/user.providers';
import { User } from 'src/users/user.entity';

@Injectable()
export class FuelRequestsService {
  private readonly logger: Logger = new Logger(FuelRequestsService.name);
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(FUEL_REQUEST_REPOSITORY)
    private fuelRequestRepository: Repository<FuelRequest>,
  ) {}

  async create(user: any, createFuelRequestDto: CreateFuelRequestDto) {
    const _user = await this.userRepository.findOne({
      where: { id: user.sub },
      relations: ['fuelRequests'],
    });
    const _fuelRequest =
      this.fuelRequestRepository.create(createFuelRequestDto);
    const _savedFuelRequest =
      await this.fuelRequestRepository.save(_fuelRequest);
    _user.fuelRequests.push(_savedFuelRequest);
    await this.userRepository.save(_user);
  }

  findAll(user: any) {
    return this.fuelRequestRepository.find({
      where: { user: { id: user.sub } },
    });
  }
}
