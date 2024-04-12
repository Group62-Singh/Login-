import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelRequestDto } from './create-fuel-request.dto';

export class UpdateFuelRequestDto extends PartialType(CreateFuelRequestDto) {}
