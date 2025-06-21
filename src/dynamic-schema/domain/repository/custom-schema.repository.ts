import { CreateDynamicSchemaDto } from 'src/dynamic-schema/application/dto/create-new-schema';
import { CustomSchemaDocument } from 'src/dynamic-schema/infrastructure/schema/custom-schema.schema';

export interface ICustomSchemaRepository {
  create(
    createDynamicSchemaDto: CreateDynamicSchemaDto,
  ): Promise<CustomSchemaDocument>;
}
