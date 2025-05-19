import { Module } from '@nestjs/common';
import { UserSchemasService } from './services/user-schemas.service';
import { UserSchemasController } from './controllers/user-schemas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchema_Schema } from './schema/user-schema';
import { UserSchemaRepository } from './repository/user_schema.respository';

@Module({
  controllers: [UserSchemasController],
  providers: [UserSchemasService, UserSchemaRepository],
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchema_Schema },
    ]),
  ],
})
export class UserSchemasModule {}
