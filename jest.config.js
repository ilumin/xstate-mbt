module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.e2e\\.(js|ts)$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
