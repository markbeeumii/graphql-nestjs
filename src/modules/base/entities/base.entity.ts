import { 
  Column , 
  CreateDateColumn, 
  DeleteDateColumn, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn} from "typeorm";


export class BaseEntity{
  @PrimaryGeneratedColumn({
    name: 'id',
    type: "integer",
  })
  id : number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}