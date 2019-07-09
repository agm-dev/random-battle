const Logger = require('../src/model/logger');
const Console = require('../src/model/console');
const Twitter = require('../src/model/twitter');

const consoleConfig = {
  type: 'console',
  prefix: '[debug]',
};

const twitterConfig = {
  type: 'twitter',
  client: 'test',
  secret: 'test',
};

const consoleLogger = new Logger(consoleConfig);
const twitterLogger = new Logger(twitterConfig);
const clients = [consoleLogger, twitterLogger];
const logPropertyName = 'log';
const printReportPropertyName = 'printReport';

describe('Logger', () => {
  test('can create an instance', () => {
    expect(consoleLogger).toBeInstanceOf(Logger);
  });

  test('instance is from specific class based on type', () => {
    expect(consoleLogger.client).toBeInstanceOf(Console);
    expect(twitterLogger.client).toBeInstanceOf(Twitter);
  });

  test('instance has a log method', () => {
    expect(consoleLogger).toHaveProperty('log');
    expect(typeof consoleLogger.log).toBe('function');
  });

  test('client instances has log and printReport methods', () => {
    clients.forEach((instance) => {
      expect(instance).toHaveProperty(logPropertyName);
      expect(typeof instance[logPropertyName]).toBe('function');
      expect(instance).toHaveProperty(printReportPropertyName);
      expect(typeof instance.printReport).toBe('function');
    });
  });
});

describe('Console logger', () => {
  test('has log method', () => {
    expect(consoleLogger.client).toHaveProperty(logPropertyName);
    expect(typeof consoleLogger.client[logPropertyName]).toBe('function');
  });

  test('has printReport method', () => {
    expect(consoleLogger.client).toHaveProperty(printReportPropertyName);
    expect(typeof consoleLogger.client[printReportPropertyName]).toBe('function');
  });

  test('has prefix property', () => {
    expect(consoleLogger.client).toHaveProperty('prefix');
  });
});

describe('Twitter logger', () => {
  test('has log method', () => {
    expect(twitterLogger.client).toHaveProperty(logPropertyName);
    expect(typeof twitterLogger.client[logPropertyName]).toBe('function');
  });

  test('has printReport method', () => {
    expect(twitterLogger.client).toHaveProperty(printReportPropertyName);
    expect(typeof twitterLogger.client[printReportPropertyName]).toBe('function');
  });
});
