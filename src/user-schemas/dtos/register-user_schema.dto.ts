import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserSchemaDto {
  @ApiProperty({
    description: 'ID del usuario que registra el esquema',
    example: 'user123',
  })
  @ApiProperty({
    description: 'Nombre del esquema a registrar',
    example: 'ProductSchema',
  })
  @IsString()
  @IsNotEmpty()
  schema_name: string;

  @ApiProperty({
    description: 'Atributos del esquema',
    example: [
      { name: 'price', type: 'number' },
      { name: 'name', type: 'string' },
    ],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
      },
    },
  })
  @IsString()
  @IsNotEmpty()
  attributes: { name: string; type: string }[];
}
