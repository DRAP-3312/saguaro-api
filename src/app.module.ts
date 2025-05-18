import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicModule } from './dynamic/dynamic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_ROOT_USERNAME')}:${configService.get('MONGO_ROOT_PASSWORD')}@localhost:${configService.get('MONGO_PORT')}`,
        dbName: configService.get('MONGO_DATABASE'),
      }),
      inject: [ConfigService],
    }),
    DynamicModule,
  ],
})
export class AppModule {}
