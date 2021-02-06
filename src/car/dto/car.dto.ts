import { IsNotEmpty } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  vim: string;

}