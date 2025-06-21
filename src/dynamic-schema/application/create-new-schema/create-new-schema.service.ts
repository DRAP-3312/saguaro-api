import { Inject, Injectable } from '@nestjs/common';
import { IStoredSchemaRepository } from 'src/dynamic-schema/domain/repository/stored-schema.repository';
import { StoredSchemaRepository } from 'src/dynamic-schema/infrastructure/persistence/stored-schema.repository';
import { CreateDynamicSchemaDto } from '../dto/create-new-schema';
import { StoredSchema } from 'src/dynamic-schema/infrastructure/schema/stored-schema.schema';
import { Types } from 'mongoose';
import { CustomSchemaRepository } from 'src/dynamic-schema/infrastructure/persistence/custom-schema.repository';
import { ICustomSchemaRepository } from 'src/dynamic-schema/domain/repository/custom-schema.repository';
import { CustomSchemaDocument } from 'src/dynamic-schema/infrastructure/schema/custom-schema.schema';

@Injectable()
export class CreteNewSchemaService {
  constructor(
    @Inject(StoredSchemaRepository)
    private readonly storedSchemaRepo: IStoredSchemaRepository,
    @Inject(CustomSchemaRepository)
    private readonly customSchemaRepo: ICustomSchemaRepository,
  ) {}

  async create(createDynamicSchemaDto: CreateDynamicSchemaDto) {
    const customSchema: CustomSchemaDocument =
      await this.customSchemaRepo.create(createDynamicSchemaDto);

    const schema: StoredSchema = {
      accessCount: 1,
      customSchemaId: customSchema['_id'] as Types.ObjectId,
      endpointPrefix: '',
      expiresAt: new Date(),
      isActive: false,
      lastAccessedAt: new Date(),
      metadata: { environment: 'dev', description: 'test', tags: [] },
      schemaName: customSchema.name,
      sessionId: '123',
      userId: '321',
    };
    return await this.storedSchemaRepo.create(schema);
  }
}
