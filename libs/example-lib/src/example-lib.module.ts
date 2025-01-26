import { Module } from '@nestjs/common';
import { ExamplelibService } from './example-lib.service';

@Module({
  providers: [ExamplelibService],
  exports: [ExamplelibService],
})
export class ExamplelibModule {}
