import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BaseEntity } from "src/modules/base/entities/base.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PasswordTransformer } from '../password.tranformer';


@ObjectType()
@Entity()
export class User {
  @Field(() => Int!, { description: 'Example field (placeholder)', nullable: false})
  @PrimaryGeneratedColumn({
    name: 'id',
    type: "integer",
  })
  id: number;

  @Field(
    ()=> String,
    {name : 'username',
    nullable: true,
  })
  @Column({
    type : 'varchar',
    nullable: true
  })
  username ? : string;

  @Field(()=> String!,{name : 'email', nullable: false})
  @Column({
    name : 'email',
    type : 'nvarchar',
    unique : true,
  })
  email : string;

  @Field(()=> String!,{name : 'password', nullable: false})
  @Column({
    name : 'password',
    type : 'varchar',
    transformer : new PasswordTransformer(),
    length: 255
  })
  password : string;

  @Column({
    name: 'images',
    type: "simple-json",
    nullable: true
  })
  @Field(()=> String,{name : 'images', nullable: true})
  images : string

  @Field(()=> Date,{name : 'createAt', nullable: false})
  @CreateDateColumn()
  createAt : Date

  @Field(()=> Date,{name : 'updateAt', nullable: true})
  @UpdateDateColumn()
  updateAt : Date

  @Field(()=> Date,{name : 'deleteAt', nullable: true})
  @DeleteDateColumn()
  deleteAt : Date

  
}
