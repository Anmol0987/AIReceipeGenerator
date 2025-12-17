import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
import { CreatedBy, Cuisine, DietType, MealType } from '../types/Recipes.type';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(96)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  instructions: string;

  @IsOptional()
  @IsEnum(Cuisine)
  cuisine: Cuisine;

  @IsOptional()
  @IsEnum(DietType)
  dietType: DietType;

  @IsOptional()
  @IsEnum(MealType)
  mealType: MealType;

  @IsOptional()
  @IsBoolean()
  isDietFriendly: boolean;

  @ArrayNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  ingredientIds: number[];

  @IsOptional()
  @IsEnum(CreatedBy)
  createdBy:CreatedBy
}
