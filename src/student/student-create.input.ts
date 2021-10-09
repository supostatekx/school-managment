import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class StudentCreateInput {
  @Field()
  @MinLength(4)
  firstName: string;

  @Field()
  @MinLength(4)
  lastName: string;
}
