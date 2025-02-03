import { Injectable } from '@nestjs/common';
import { ExamplelibService as NoScopedNpmService } from 'example-lib-1';
import { ExamplelibService as ScopedNpmService } from '@javiersfalp/template-module-nodejs';
import { ExamplelibService as LocalLibService } from '@javiersfalp/template-module-nodejs-local';

@Injectable()
export class AppService {
  constructor(
    private readonly noScopedNpmService: NoScopedNpmService,
    private readonly scopedNpmService: ScopedNpmService,
    private readonly localLibService: LocalLibService
  ) {}

  greet(): string {
    return this.localLibService.greet();
  }

  packageNoScopedGreet(): string {
    return this.noScopedNpmService.greet();
  }

  packageScopedGreet(): string {
    return this.scopedNpmService.greet();
  }
}
