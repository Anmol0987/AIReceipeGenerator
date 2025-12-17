import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipes.dto';
import { In, Repository } from 'typeorm';
import { Recipes } from './recipes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/ingredients.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  public async createRecipe(createRecipeDto: CreateRecipeDto) {
    const { ingredientIds, ...recipeData } = createRecipeDto;

    const ingredients = await this.ingredientRepository.find({
      where: { id: In(ingredientIds) },
    });

    if (ingredients.length !== ingredientIds.length) {
      throw new BadRequestException('One or more ingredient IDs are invalid');
    }

    const recipe = this.recipesRepository.create({
      ...recipeData,
      ingredients,
    });
    return await this.recipesRepository.save(recipe);
  }

  public async findAllRecipe() {
    return await this.recipesRepository.find({
      relations: ['ingredients'],
    });
  }

  public async findRecipeById(id: number) {
    const recipe = this.recipesRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    if (!recipe) {
      throw new BadRequestException('Recipe not found');
    }

    return recipe;
  }
}
