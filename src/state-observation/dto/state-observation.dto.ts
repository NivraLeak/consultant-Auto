import { IsNotEmpty } from 'class-validator';

export class StateObservationDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}