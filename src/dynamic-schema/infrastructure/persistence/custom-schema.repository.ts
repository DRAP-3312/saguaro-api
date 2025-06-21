import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CustomSchema,
  CustomSchemaDocument,
} from '../schema/custom-schema.schema';
import { ICustomSchemaRepository } from 'src/dynamic-schema/domain/repository/custom-schema.repository';
import { CreateDynamicSchemaDto } from 'src/dynamic-schema/application/dto/create-new-schema';

@Injectable()
export class CustomSchemaRepository implements ICustomSchemaRepository {
  constructor(
    @InjectModel(CustomSchema.name)
    private readonly customSchemaModel: Model<CustomSchemaDocument>,
  ) {}

  async create(
    createDynamicSchemaDto: CreateDynamicSchemaDto,
  ): Promise<CustomSchemaDocument> {
    try {
      return await this.customSchemaModel.create(createDynamicSchemaDto);
    } catch (error) {
      throw new InternalServerErrorException(
        `Fail create custom schema, ${error}`,
      );
    }
  }
}
