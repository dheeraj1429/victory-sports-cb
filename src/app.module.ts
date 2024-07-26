import { Module } from '@nestjs/common';
import { CbModule } from './cb/cb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
