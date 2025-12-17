import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './ingredients.entity';
import { In, Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { CreateBulkIngredientDto } from './dtos/create-bulk-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  public async createIngredient(createIngredientDto: CreateIngredientDto) {
    let ingredient = undefined;

    ingredient = await this.findByName(createIngredientDto.name);
    if (ingredient) throw new ConflictException('Ingredient already exist');

    ingredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  public async createBulkIngredient(
    createBulkIngredientDto: CreateBulkIngredientDto,
  ) {
    const rawIngredients = createBulkIngredientDto.ingredients
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);

    if (rawIngredients.length === 0) {
      throw new BadRequestException('No valid ingredients provided');
    }
    const uniqueIngredients = [...new Set(rawIngredients)];
    const existingIngredients = await this.ingredientRepository.find({
      where: {
        name: In(uniqueIngredients),
      },
    });

    const existingNames = existingIngredients.map((i) => i.name);

    const newIngredients = uniqueIngredients.filter(
      (name) => !existingNames.includes(name),
    );

    let createdIngredients = [];
    if (newIngredients.length > 0) {
      const entities = this.ingredientRepository.create(
        newIngredients.map((name) => ({ name })),
      );
      createdIngredients = await this.ingredientRepository.save(entities);
    }

    return {
      requested: uniqueIngredients.length,
      created: createdIngredients.map((i) => i.name),
      skipped: existingNames,
    };
  }

  public async findAllIngredients() {
    try {
      return await this.ingredientRepository.find();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process request at the moment',
      );
    }
  }

  public async findByName(name: string) {
    try {
      return await this.ingredientRepository.findOne({
        where: { name: name },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process request at the moment',
      );
    }
  }
}
