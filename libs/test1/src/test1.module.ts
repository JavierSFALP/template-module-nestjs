import { Module } from '@nestjs/common';
import { Test1Service } from './test1.service';

@Module({
  providers: [Test1Service],
  exports: [Test1Service],
})
export class Test1Module {}
