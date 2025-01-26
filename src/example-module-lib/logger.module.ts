import { Module, DynamicModule, Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerModuleOptions } from './interfaces';
import { LOG_LEVEL } from './contants';

@Module({})
export class LoggerModule {
  static register(options: LoggerModuleOptions): DynamicModule {
    const loggerProvider: Provider = {
      provide: LOG_LEVEL,
      useValue: options.logLevel,
    };

    return {
      module: LoggerModule,
      providers: [loggerProvider, LoggerService],
      exports: [LoggerService],
    };
  }
}