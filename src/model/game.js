const Battleground = require('./battleground');
const Logger = require('./logger');

const DEFAULT_LOGGER_CONFIG = {
  type: 'console',
  prefix: '[random-battle]',
};

const DEFAULT_INTERVAL = 15;

class Game {
  constructor({
    title = 'untitled',
    warriors = [],
    logger = DEFAULT_LOGGER_CONFIG,
    interval = DEFAULT_INTERVAL,
  }) {
    this.title = title;
    this.battleground = new Battleground({ title, warriors });
    this.logger = new Logger(logger);
    this.timer = null;
    this.interval = interval * 60 * 1000; // from minutes to milliseconds
  }

  start() {
    this.timer = setInterval(this.tick.bind(this), this.interval);
    this.logger.printReport({
      round: this.battleground.rounds,
      warriors: this.battleground.warriors,
      title: this.title,
    });
    return this;
  }

  tick() {
    const [winner, loser] = this.battleground.round();
    this.logger.printReport({
      round: this.battleground.rounds,
      warriors: this.battleground.warriors,
      winner,
      loser,
    });

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
