import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) 
    private readonly userRepository : Repository<User>
  ){}

  async create(createUserInput: CreateUserInput) {
    console.log(createUserInput)
    try{
      return await this.userRepository.save(
        this.userRepository.create({...createUserInput})
      );
     }catch(error){
      throw new BadRequestException(error)
     }
  }

  async findAll() {
    try{
      const queryBuilder = this.userRepository.createQueryBuilder('users')
      return await queryBuilder.getMany()
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    try{
      const user = await this.userRepository.findOne({})

      if (!user) {
        throw new Error("User not found");
      }

      user.username = updateUserInput.username;
      user.email = updateUserInput.email;
      user.password = updateUserInput.password;
      user.images = updateUserInput.images

      await this.userRepository.save(user);

      return user;
    }catch(error){
      throw new BadRequestException(error )
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
