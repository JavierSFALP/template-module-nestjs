import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { LOG_LEVEL } from './contants';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: LOG_LEVEL,
          useValue: 'info',
        },
      ],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  it('should log messages correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    loggerService.log('Test log message');
    expect(consoleSpy).toHaveBeenCalledWith('[INFO] Test log message');
    consoleSpy.mockRestore();
  });

  it('should log info messages when log level is info', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    loggerService.info('Info message');
    expect(consoleSpy).toHaveBeenCalledWith('[INFO] Info message');
    consoleSpy.mockRestore();
  });

  it('should not log info messages when log level is warn', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    loggerService = new LoggerService('warn');
    loggerService.info('This should not be logged');
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // it('should log error messages', () => {
  //   const consoleSpy = jest.spyOn(console, 'log');
  //   loggerService = new LoggerService('error');
  //   loggerService.error('Error message');
  //   expect(consoleSpy).toHaveBeenCalledWith('[ERROR] Error message');
  //   consoleSpy.mockRestore();
  // });
});