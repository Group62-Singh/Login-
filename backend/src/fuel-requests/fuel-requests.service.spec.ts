import { Test, TestingModule } from '@nestjs/testing';
import { FuelRequestsService } from './fuel-requests.service';

describe('FuelRequestsService', () => {
  let service: FuelRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelRequestsService],
    }).compile();

    service = module.get<FuelRequestsService>(FuelRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
