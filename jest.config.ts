module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'config',
    'health',
    'logger',
    'util',
    'dto',
    'entity',
    'enums',
    '.module.ts',
    'main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
};
