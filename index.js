const Game = require('./src/model/game');
const { game: { interval } } = require('./src/config/vars');
const { loadPlayersData } = require('./src/utils/json');


const game = new Game({
  title: 'random battle',
  warriors: loadPlayersData(),
  interval, // minutes!
  // logger: { type: 'twitter' }, // successful twitter testing
}).start();
