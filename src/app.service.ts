import { Injectable } from '@nestjs/common';
import { ExamplelibService as UnScopedNpmService } from 'example-lib-1';
import { ExamplelibService as ScopedNpmService } from '@javiersfalp/template-module-nodejs';
// import { ExamplelibService as LocalLibService } from '@javiersfalp/template-module-nodejs-local';

@Injectable()
export class AppService {
  constructor(
    private readonly unScopedNpmService: UnScopedNpmService,
    private readonly scopedNpmService: ScopedNpmService,
    // private readonly localLibService: LocalLibService
  ) {}

  greet(): string {
    return 'local';
  }

  // greet(): string {
  //   return this.localLibService.greet();
  // }

  // packageUnScopedGreet(): string {
  //   return this.unScopedNpmService.unScopedGreet();
  // }

  // packageScopedGreet(): string {
  //   return this.scopedNpmService.scopedGreet();
  // }
}
