import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
function IsMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue; // You can expand this to include more complex logic
        },
        defaultMessage(args: ValidationArguments) {
          // here you can provide default error message if validation failed
          return `${propertyName} doesn't match ${args.constraints[0]}`;
        },
      },
    });
  };
}
export class CreateAuthDto {
  @ApiProperty({ type: String, example: `xxxxx` })
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: `xxxxx` })
  @IsString()
  password: string;

  @ApiProperty({ type: String, example: 'xxxxx' })
  @IsString()
  @IsMatch('password', {
    message: 'Password confirmation does not match password',
  }) // Use the custom decorator here
  password_confirm: string;

  @ApiProperty({ type: String, example: `xxxxx` })
  @IsString()
  role: string;
}
