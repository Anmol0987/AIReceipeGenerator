import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(96)
  @MinLength(2)
  name: string;
}
