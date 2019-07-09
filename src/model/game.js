const Battleground = require('./battleground');
const Logger = require('./logger');

const DEFAULT_LOGGER_CONFIG = {
  type: 'console',
  prefix: '[random-battle]',
};

const DEFAULT_INTERVAL = 15 * 60 * 1000; // 15 min in milliseconds

class Game {
  constructor({
    title = 'untitled',
    warriors = [],
    logger = DEFAULT_LOGGER_CONFIG,
    interval = DEFAULT_INTERVAL,
  }) {
    this.battleground = new Battleground({ title, warriors });
    this.logger = new Logger(logger);
    this.timer = null;
    this.interval = interval;
  }

  start() {
    this.timer = setInterval(this.tick.bind(this), this.interval);
  }

  tick() {
    const [winner, loser] = this.battleground.round();
    this.logger.printReport({ warriors: this.battleground.warriors, winner, loser });

    const alive = this.battleground.getAlive();
    if (alive.length === 1) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

module.exports = Game;
