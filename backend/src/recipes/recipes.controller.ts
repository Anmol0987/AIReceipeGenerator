import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dtos/create-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  public createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.createRecipe(createRecipeDto);
  }

  @Get()
  public findAllRecipe() {
    return this.recipeService.findAllRecipe();
  }

  @Get(':id')
  public findRecipeById(@Param('id',ParseIntPipe) id: number) {
    return this.recipeService.findRecipeById(id);
  }
}
