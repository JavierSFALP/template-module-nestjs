import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamplelibService {
  scopedGreet(): string {
    return 'This is scoped example message'; 
  }
}