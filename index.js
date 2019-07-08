const Game = require('./src/model/game');

const title = 'Test title';
const namesConfig = 'warrior 1,warrior 2,warrior 3,warrior 4,warrior 5';
const names = namesConfig.split(',');
const warriors = names.map(name => ({ name }));
const interval = 1 * 1000; // 5 seconds in milliseconds

const game = new Game({
  title,
  warriors,
  interval,
});

game.start();

// eslint-disable-next-line no-console
console.log('initiated game');
