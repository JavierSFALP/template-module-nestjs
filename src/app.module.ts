import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './example-module-lib';
import { ExamplelibModule } from 'example-lib-1'
import { ExamplelibModule as npmModule} from '@javiersfalp/template-module-nodejs'

export const loggerModule = LoggerModule.register({ logLevel: 'info' });

@Module({
  imports: [
    loggerModule,
    ExamplelibModule,
    npmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
