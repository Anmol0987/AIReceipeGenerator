import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:'varchar',
    name:"email",
    length:96,
    nullable:false,
    unique:true

  })
  email: string;

  @Column({
    type:'varchar',
    name:"password",
    nullable:false,
    length:96
  })
  password:string;

  @Column({
    type:"varchar",
    name:"name",
    length:96,
    nullable:false
  })
  name:string;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}
