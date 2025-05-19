import { Body, Controller, Headers, Post } from '@nestjs/common';
import { UserSchemasService } from '../services/user-schemas.service';
import { RegisterUserSchemaDto } from '../dtos/register-user_schema.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('User Schemas')
@Controller('user-schemas')
export class UserSchemasController {
  constructor(private readonly userSchemasService: UserSchemasService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo esquema de usuario' })
  @ApiResponse({
    status: 201,
    description: 'El esquema ha sido registrado exitosamente',
    type: RegisterUserSchemaDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  register(
    @Body() registerUserSchemaDto: RegisterUserSchemaDto,
    @Headers('x-user-identifier') idUser: string,
  ) {
    return this.userSchemasService.register(registerUserSchemaDto, idUser);
  }
}
