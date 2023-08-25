import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Field(
    ()=> String,
    {name : 'username',
    nullable: true,
  })
  username ? : string;

  @Field(()=> String,{name : 'email'})
  email : string;

  @Field(()=> String,{name : 'password'})
  password : string;

  @Field(()=>String,{name: 'images'})
  images: string
}
