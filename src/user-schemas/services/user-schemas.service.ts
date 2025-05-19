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
import { generateUniqueCollectionIdentifier } from '../funtions/generateUniqueName.funtion';

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
      const customSchemaNameUnique =
        generateUniqueCollectionIdentifier(schema_name);
      const now = new Date();
      const expirationTimestamp = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      const newUserSchema: UserSchema = {
        attributes: attributes,
        creation_timestamp: now,
        expiration_timestamp: expirationTimestamp,
        schema_name: schema_name,
        unique_collection_identifier: customSchemaNameUnique,
        user_id: idUser,
      };

      const useSchemaCreated =
        await this.userSchemaRepo.registerUserSchema(newUserSchema);
      const status = await this.userSchemaRepo.createCollectionInMongoDB(
        customSchemaNameUnique,
      );

      if (!status) {
        throw new BadRequestException(`Can't create collection`);
      }
      return useSchemaCreated;
    } catch (error) {
      throw error;
    }
  }
}
