const Game = require('./src/model/game');
const { game: { playersJSON } } = require('./src/config/vars');
const { readJSON } = require('./src/utils/json');

const title = 'Test title';
const interval = 1 * 1000; // 5 seconds in milliseconds

const jsonData = readJSON(playersJSON);
const warriors = jsonData.map((row) => {
  const [name, twitter] = row;
  return { name, twitter };
});

const game = new Game({
  title,
  warriors,
  interval,
  // logger: { type: 'twitter' }, // successful twitter testing
});

game.start();

// eslint-disable-next-line no-console
console.log('initiated game');
