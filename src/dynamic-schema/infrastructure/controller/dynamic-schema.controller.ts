import { Body, Controller, Post } from '@nestjs/common';
import { CreteNewSchemaService } from 'src/dynamic-schema/application/create-new-schema/create-new-schema.service';
import { CreateDynamicSchemaDto } from 'src/dynamic-schema/application/dto/create-new-schema';

@Controller()
export class DynamicSchemaController {
  constructor(private readonly creteNewSchemaService: CreteNewSchemaService) {}

  @Post()
  create(@Body() createDynamicSchemaDto: CreateDynamicSchemaDto) {
    return this.creteNewSchemaService.create(createDynamicSchemaDto);
  }
}
