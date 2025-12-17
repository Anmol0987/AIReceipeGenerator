import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreatedBy, Cuisine, DietType, MealType } from './types/Recipes.type';
import { Ingredient } from 'src/ingredients/ingredients.entity';

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'recipes_title',
    length: 96,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    name: 'recipes_description',
    nullable: false,
  })
  description: string;

  @ManyToMany(() => Ingredient, { eager: false })
  @JoinTable({
    name: 'recipe_ingredients',
  })
  ingredients: Ingredient[];

  @Column({
    type: 'text',
    name: 'recipes_instructions',
    nullable: false,
  })
  instructions: string;

  @Column({
    type: 'enum',
    enum: Cuisine,
    name: 'recipes_cuisine',
    default: Cuisine.INDIAN,
    nullable: false,
  })
  cuisine: Cuisine;

  @Column({
    type: 'enum',
    name: 'recipes_dietType',
    enum: DietType,
    default: DietType.VEG,
    nullable: false,
  })
  dietType: DietType;

  @Column({
    type: 'enum',
    name: 'recipes_mealType',
    enum: MealType,
    default: MealType.DINNER,
    nullable: false,
  })
  mealType: MealType;

  @Column({
    type: 'boolean',
    name: 'recipes_isDietFriendly',
    nullable: false,
  })
  isDietFriendly: boolean;

  @Column({
    type: 'enum',
    name: 'recipes_createdBy',
    default: CreatedBy.AI,
    enum: CreatedBy,
    nullable: true,
  })
  createdBy?: CreatedBy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
