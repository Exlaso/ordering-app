 import { IsNumber, IsString } from '@app/common/decorator/validator.decorator';
 import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequest {
   @IsString({})
  name: string;

   @IsNumber({})
  price: number;

   @IsPhoneNumber()
  @ApiProperty({
    description: 'Phone number',
    example: '1234567890',
  })
  phoneNumber: string;

}