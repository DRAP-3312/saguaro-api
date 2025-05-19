import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSchemaRepository } from '../repository/user_schema.respository';
import { IUserSchemaRepository } from '../types/user-schema-repository.type';
import { RegisterUserSchemaDto } from '../dtos/register-user_schema.dto';
import { UserSchema } from '../schema/user-schema';

@Injectable()
export class UserSchemasService {
  constructor(
    @Inject(UserSchemaRepository)
    private readonly userSchemaRepo: IUserSchemaRepository,
  ) {}

  async register(
    { attributes, schema_name }: RegisterUserSchemaDto,
    idUser: string,
  ) {
    try {
      if (!idUser) {
        throw new NotFoundException(`user id not found`);
      }
      const now = new Date();
      const expirationTimestamp = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      const newUserSchema: UserSchema = {
        attributes: attributes,
        creation_timestamp: now,
        expiration_timestamp: expirationTimestamp,
        schema_name: schema_name,
        unique_collection_identifier: `${schema_name}-${idUser}`,
        user_id: idUser,
      };

      return await this.userSchemaRepo.registerUserSchema(newUserSchema);
    } catch (error) {
      throw error;
    }
  }
}
