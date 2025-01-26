import { Injectable, Inject } from '@nestjs/common';
import { LOG_LEVEL } from './contants';

@Injectable()
export class LoggerService {
  constructor(@Inject(LOG_LEVEL) private readonly logLevel: string) {}

  log(message: string): void {
    console.log(`[${this.logLevel.toUpperCase()}] ${message}`);
  }

  info(message: string): void {
    if (this.logLevel === 'info') {
      this.log(message);
    }
  }

  warn(message: string): void {
    if (this.logLevel === 'warn' || this.logLevel === 'info') {
      this.log(message);
    }
  }

  error(message: string): void {
    this.log(message);
  }
}