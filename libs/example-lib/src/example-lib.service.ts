import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamplelibService {
  unScopedGreet(): string {
    return 'This is unscoped example message'; 
  }
}