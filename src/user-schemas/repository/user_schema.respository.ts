import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSchema, UserSchemaDocument } from '../schema/user-schema';
import { IUserSchemaRepository } from '../types/user-schema-repository.type';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserSchemaRepository implements IUserSchemaRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userSchemaModel: Model<UserSchemaDocument>,
    @InjectConnection() private readonly connection: Connection,
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

  async createCollectionInMongoDB(collectionName: string): Promise<boolean> {
    try {
      //obtener la instancia de la bd
      const db = this.connection.db;
      if (!db) return false;
      await db.createCollection(collectionName);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(`Error creating collection`);
    }
  }
}
