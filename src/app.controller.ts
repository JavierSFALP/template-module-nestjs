import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  greet(): string {
    const localGreet = this.appService.greet();
    // const scopedGreet = this.appService.packageScopedGreet();
    // const unScopedGreet = this.appService.packageUnScopedGreet();
    // const message = `Local: ${localGreet} - Scoped: ${scopedGreet} - UnScoped: ${unScopedGreet}`;
    return localGreet;
  }
}
