const Console = require('./console');
const { tweet } = require('../service/twitter.service');

class Twitter {
  constructor() {
    this.logger = new Console({ prefix: '[twitterLogger]' });
  }

  async log(text = '', data = null) {
    try {
      const resultData = await tweet(text);
      this.logger.log('success on sending tweet', resultData);
    } catch (err) {
      this.logger.log('error on sending tweet', err);
    }
  }

  async printReport(text = '', media = '') {
    // TODO: upload media, then tweet text with attached media
    this.logger.printReport(text, media);
  }
}

module.exports = Twitter;
