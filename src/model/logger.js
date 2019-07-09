const Console = require('./console');
const Twitter = require('./twitter');
const { getWarriorDisplayText } = require('../utils/text');
const { twitter: { hashtag }} = require('../config/vars');

class Logger {
  constructor(config) {
    this.init(config);
  }

  init({
    type,
    prefix,
  }) {
    switch (type) {
      case 'twitter':
        this.client = new Twitter();
        break;
      default:
        this.client = new Console({ prefix });
    }
  }

  log(text = '', data = null) {
    this.client.log(text, data);
  }

  printReport(data = {}) {
    const {
      round = 1,
      warriors,
      winner,
      loser,
    } = data;

    const alive = warriors.filter(warrior => warrior.alive);
    const winnerName = getWarriorDisplayText(winner);
    const loserName = getWarriorDisplayText(loser);
    const remaining = alive.length === 1 ? `${winnerName} has won the battle` : `${alive.length} remaining`;
    // TODO: image

    const text = `Round ${round}.\n${winnerName} has defeated ${loserName}.\n\n${remaining}. #${hashtag}`;

    this.client.printReport(text);
  }

}

module.exports = Logger;
