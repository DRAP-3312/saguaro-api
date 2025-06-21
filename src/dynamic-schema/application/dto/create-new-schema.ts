import {
  IsString,
  IsObject,
  IsOptional,
  ValidateNested,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PropertyDefinitionDto {
  @IsString()
  type: 'string' | 'number' | 'boolean' | 'array';

  @IsOptional()
  required?: boolean;

  @IsOptional()
  default?: any;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateDynamicSchemaDto {
  @IsString()
  @Max(50, { message: 'El nombre del esquema no puede exceder 50 caracteres' })
  schemaName: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PropertyDefinitionDto)
  properties: {
    [key: string]: PropertyDefinitionDto;
  };
}
