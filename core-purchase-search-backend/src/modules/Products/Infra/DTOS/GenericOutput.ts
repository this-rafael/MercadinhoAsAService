import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenericOutput {
  @Field()
  public readonly success: boolean;
  @Field()
  public readonly message: string;
  @Field()
  public readonly timestamp: Date;

  constructor(message: string, success: boolean, timestamp: Date) {
    this.success = success;
    this.message = message;
    this.timestamp = timestamp;
  }
}
