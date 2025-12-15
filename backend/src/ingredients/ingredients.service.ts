import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './ingredients.entity';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  public async createIngredient(createIngredientDto: CreateIngredientDto) {
    let ingredient = undefined;

    ingredient =await this.findByName(createIngredientDto.name);
    if (ingredient) throw new ConflictException('Ingredient already exist');

    ingredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
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
