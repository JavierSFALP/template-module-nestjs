import { Test, TestingModule } from '@nestjs/testing';
import { ExamplelibService } from './example-lib.service';

describe('ExampleLibService', () => {
  let service: ExamplelibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamplelibService],
    }).compile();

    service = module.get<ExamplelibService>(ExamplelibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
