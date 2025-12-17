import { IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";

export  class CreateBulkIngredientDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    ingredients:string 
}