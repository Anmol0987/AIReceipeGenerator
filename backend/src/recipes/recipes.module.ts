import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from './recipes.entity';
import { Ingredient } from 'src/ingredients/ingredients.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Recipes,Ingredient])],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
