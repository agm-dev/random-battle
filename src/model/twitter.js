const Console = require('./console');
const { tweet, tweetWithMedia } = require('../service/twitter.service');

class Twitter {
  constructor() {
    this.logger = new Console({ prefix: '[twitterLogger]' });
  }

  async log(text = '', media = '') {
    try {
      const resultData = media.length ? await tweetWithMedia(text, media) : await tweet(text);
      this.logger.log('success on sending tweet', resultData);
    } catch (err) {
      this.logger.log('error on sending tweet', err);
    }
  }

  async printReport(text = '', media = '') {
    const result = await tweetWithMedia(text, media);
    this.logger.printReport(text, media);
    this.logger.log('Twitter response: ', result);
  }
}

module.exports = Twitter;
