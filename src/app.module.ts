import { Module } from '@nestjs/common';
import { DynamicModule } from './dynamic/dynamic.module';

@Module({
  imports: [DynamicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
