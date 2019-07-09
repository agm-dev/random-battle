const Console = require('./console');
const Twitter = require('./twitter');
const { getWarriorDisplayText } = require('../utils/text');
const { twitter: { hashtag }} = require('../config/vars');
const { createImage, formatImageContent } = require('../service/text-image.service');

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
      winner = null,
      loser = null,
      title = '',
    } = data;

    const alive = warriors.filter(warrior => warrior.alive);
    const winnerName = winner ? getWarriorDisplayText(winner) : '';
    const loserName = loser ? getWarriorDisplayText(loser) : '';
    const remaining = alive.length === 1 ? `${winnerName} has won the battle` : `${alive.length} remaining`;

    const imageContent = formatImageContent(warriors);
    const imageData = createImage(imageContent);

    const text = round === 0 && title.length
      ? `The ${title} game has started.\n\n${remaining}. #${hashtag}`
      : `Round ${round}.\n${winnerName} has defeated ${loserName}.\n\n${remaining}. #${hashtag}`;

    this.client.printReport(text, imageData);
  }
}

module.exports = Logger;
