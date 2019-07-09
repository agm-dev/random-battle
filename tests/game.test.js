const { join } = require('path');
const Game = require('../src/model/game');
const Battleground = require('../src/model/battleground');
const Logger = require('../src/model/logger');
const { readJSON } = require('../src/utils/json');


const title = 'Test title';
// eslint-disable-next-line import/no-dynamic-require
const jsonData = readJSON(join(__dirname, '..', 'players.example.json'));
const warriors = jsonData.map((row) => {
  const [name, twitter] = row;
  return { name, twitter };
});
const interval = 0.5 * 1000; // 0.5 seconds in milliseconds

describe('Game', () => {
  const game = new Game({
    title,
    warriors,
    interval,
  });

  test('can create an instance', () => {
    expect(game).toBeInstanceOf(Game);
  });

  test('has a battleground instance', () => {
    expect(game).toHaveProperty('battleground');
    expect(game.battleground).toBeInstanceOf(Battleground);
  });

  test('has a logger instance', () => {
    expect(game).toHaveProperty('logger');
    expect(game.logger).toBeInstanceOf(Logger);
  });

  test('instance has title property', () => {
    expect(game).toHaveProperty('title');
    expect(game.title).toBeDefined();
    expect(typeof game.title).toBe('string');
    expect(game.title.length).toBeGreaterThan(0);
  });

  test('instance title is the same that was provided in the constructor', () => {
    expect(game.title).toBe(title);
  });

  test('has a timer property', () => {
    expect(game).toHaveProperty('timer');
  });

  test('has a interval property', () => {
    expect(game).toHaveProperty('interval');
    expect(game.interval).toBeDefined();
    expect(typeof game.interval).toBe('number');
    expect(game.interval).toBeGreaterThanOrEqual(0);
  });

  test('has a tick method', () => {
    expect(game).toHaveProperty('tick');
    expect(typeof game.tick).toBe('function');
  });

  test('has endGame method', () => {
    expect(game).toHaveProperty('endGame');
    expect(typeof game.endGame).toBe('function');
  });

  test('has start method', () => {
    expect(game).toHaveProperty('start');
    expect(typeof game.start).toBe('function');
  });
});
