import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FuelRequestsService } from './fuel-requests.service';
import { CreateFuelRequestDto } from './dto/create-fuel-request.dto';
import { UpdateFuelRequestDto } from './dto/update-fuel-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('fuel-requests')
export class FuelRequestsController {
  constructor(private readonly fuelRequestsService: FuelRequestsService) {}

  @Post()
  create(@Req() req, @Body() createFuelRequestDto: CreateFuelRequestDto) {
    return this.fuelRequestsService.create(req.user, createFuelRequestDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.fuelRequestsService.findAll(req.user);
  }
}
