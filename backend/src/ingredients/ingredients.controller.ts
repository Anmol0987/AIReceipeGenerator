import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBulkIngredientDto } from './dtos/create-bulk-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public createIngredient(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.createIngredient(createIngredientDto);
  }


  // @UseGuards(JwtAuthGuard)
  @Post('/bulk')
  public createBulkIngredient(@Body() createBulkIngredientDto: CreateBulkIngredientDto) {
    return this.ingredientService.createBulkIngredient(createBulkIngredientDto);
  }


  // @UseGuards(JwtAuthGuard)
  @Get()
  public findAllIngredients() {
    return this.ingredientService.findAllIngredients();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.ingredientService.findByName(name);
  }
}
