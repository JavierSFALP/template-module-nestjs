import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamplelibService {
  greet(): string {
    return 'This is unscoped example message'; 
  }
}