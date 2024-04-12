import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import states from 'states-us';

export function IsState(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isState',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !value || states.some((state) => state.abbreviation === value);
        },
      },
    });
  };
}
