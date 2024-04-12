import { IsState } from 'src/validators/is-state.validator';

export class UpdateProfileDto {
  fullName: string;
  address1: string;
  address2: string;
  city: string;

  @IsState({ message: 'The format of the state must be in alpha-2' })
  state: string;
  zipCode: string;
}
