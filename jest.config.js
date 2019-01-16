module.exports = {
  moduleFileExtensions: [
    'jsx',
    'js',
    'css',
  ],
  testMatch: [
    '**/*.(test|spec).(js|jsx)',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'enzyme.js',
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/output/test',
  setupFiles: ['<rootDir>/setupFile.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/jest-transform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  setupTestFrameworkScriptFile: '<rootDir>/enzyme.js',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
