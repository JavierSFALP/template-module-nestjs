import { Injectable } from '@nestjs/common';
import { ExamplelibService } from 'example-lib-1';

@Injectable()
export class AppService {
  constructor(private readonly examplelibService: ExamplelibService) {}

  greet(): string {
    return this.examplelibService.greet();
  }
}
