import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './example-module-lib';
import { ExamplelibModule } from 'example-lib-1'

export const loggerModule = LoggerModule.register({ logLevel: 'info' });

@Module({
  imports: [
    loggerModule,
    ExamplelibModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
