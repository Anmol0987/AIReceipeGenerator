import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'ingredient_name',
    unique: true,
    length: 96,
    nullable: false,
  })
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    if (this.name) {
      this.name = this.name.toLowerCase().trim();
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
