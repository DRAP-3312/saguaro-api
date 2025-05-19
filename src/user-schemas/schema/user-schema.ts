import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserSchemaDocument = UserSchema & Document & { _id: string };

@Schema({ collection: 'user-schema', timestamps: false })
export class UserSchema {
  @ApiProperty({
    description: 'ID del usuario propietario del esquema',
    example: 'user123'
  })
  @Prop({ required: true, type: String })
  user_id: string;

  @ApiProperty({
    description: 'Nombre del esquema',
    example: 'ProductSchema'
  })
  @Prop({ required: true, type: String })
  schema_name: string;

  @ApiProperty({
    description: 'Identificador único de la colección',
    example: 'products_user123'
  })
  @Prop({ required: true, type: String })
  unique_collection_identifier: string;

  @ApiProperty({
    description: 'Atributos del esquema',
    example: [
      { name: 'price', type: 'number' },
      { name: 'name', type: 'string' }
    ],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' }
      }
    }
  })
  @Prop({
    required: true,
    type: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  })
  attributes: { name: string; type: string }[];

  @ApiProperty({
    description: 'Fecha de creación del esquema',
    example: '2024-03-20T10:00:00Z'
  })
  @Prop({ required: true, type: Date })
  creation_timestamp: Date;

  @ApiProperty({
    description: 'Fecha de expiración del esquema',
    example: '2025-03-20T10:00:00Z'
  })
  @Prop({ required: true, type: Date })
  expiration_timestamp: Date;
}

export const UserSchema_Schema = SchemaFactory.createForClass(UserSchema);
