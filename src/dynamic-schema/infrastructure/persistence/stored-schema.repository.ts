import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StoredSchema,
  StoredSchemaDocument,
} from '../schema/stored-schema.schema';
import { IStoredSchemaRepository } from 'src/dynamic-schema/domain/repository/stored-schema.repository';
@Injectable()
export class StoredSchemaRepository implements IStoredSchemaRepository {
  constructor(
    @InjectModel(StoredSchema.name)
    private readonly schemaManagementModel: Model<StoredSchemaDocument>,
  ) {}

  async create(storedSchema: StoredSchema): Promise<StoredSchemaDocument> {
    try {
      return await this.schemaManagementModel.create(storedSchema);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fail create custom schema, ${error}`,
      );
    }
  }
}
