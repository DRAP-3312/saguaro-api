import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSchema, UserSchemaDocument } from '../schema/user-schema';
import { IUserSchemaRepository } from '../types/user-schema-repository.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserSchemaRepository implements IUserSchemaRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userSchemaModel: Model<UserSchemaDocument>,
  ) {}

  async registerUserSchema(
    userSchema: UserSchema,
  ): Promise<UserSchemaDocument> {
    try {
      return await this.userSchemaModel.create(userSchema);
    } catch (error) {
      throw new InternalServerErrorException(`Error registering user schema`);
    }
  }
}
