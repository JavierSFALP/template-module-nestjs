import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './example-module-lib';
import { ExamplelibModule as noScopedNpmModule } from 'example-lib-1';
import { ExamplelibModule as scopedNpmModule} from '@javiersfalp/template-module-nodejs';
import { ExamplelibModule as localLib } from '@javiersfalp/template-module-nodejs-local';

export const loggerModule = LoggerModule.register({ logLevel: 'info' });

@Module({
  imports: [
    loggerModule,
    noScopedNpmModule,
    scopedNpmModule,
    localLib
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
