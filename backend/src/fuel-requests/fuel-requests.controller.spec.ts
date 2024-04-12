import { Test, TestingModule } from '@nestjs/testing';
import { FuelRequestsController } from './fuel-requests.controller';
import { FuelRequestsService } from './fuel-requests.service';

describe('FuelRequestsController', () => {
  let controller: FuelRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelRequestsController],
      providers: [FuelRequestsService],
    }).compile();

    controller = module.get<FuelRequestsController>(FuelRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
