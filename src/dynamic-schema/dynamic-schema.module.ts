import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StoredSchema,
  StoredSchemaSchema,
} from './infrastructure/schema/stored-schema.schema';
import { StoredSchemaRepository } from './infrastructure/persistence/stored-schema.repository';
import { CreteNewSchemaService } from './application/create-new-schema/create-new-schema.service';
import {
  CustomSchema,
  CustomSchemaSchema,
} from './infrastructure/schema/custom-schema.schema';
import { CustomSchemaRepository } from './infrastructure/persistence/custom-schema.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StoredSchema.name, schema: StoredSchemaSchema },
      { name: CustomSchema.name, schema: CustomSchemaSchema },
    ]),
  ],
  providers: [
    StoredSchemaRepository,
    CustomSchemaRepository,
    CreteNewSchemaService,
  ],
})
export class DynamicSchemaModule {}
