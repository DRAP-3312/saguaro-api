import {
  StoredSchema,
  StoredSchemaDocument,
} from 'src/dynamic-schema/infrastructure/schema/stored-schema.schema';

export interface IStoredSchemaRepository {
  create(schemaManagement: StoredSchema): Promise<StoredSchemaDocument>;
}
