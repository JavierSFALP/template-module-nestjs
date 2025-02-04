import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './example-module-lib';
import { ExamplelibModule as UnScopedNpmModule } from 'example-lib-1';
import { ExamplelibModule as ScopedNpmModule} from '@testfalp/template-module-nodejs';
import { ExamplelibModule as LocalLibModule } from '@testfalp/template-module-nodejs-local';

export const loggerModule = LoggerModule.register({ logLevel: 'info' });

@Module({
  imports: [
    loggerModule,
    UnScopedNpmModule,
    ScopedNpmModule,
    LocalLibModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
