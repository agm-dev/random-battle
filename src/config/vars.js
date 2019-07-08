const { join } = require('path');
const { load } = require('dotenv-safe');

load({
  path: join(__dirname, '..', '..', '.env'),
  sample: join(__dirname, '..', '..', '.env.example'),
});

module.exports = {
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  game: {
    interval: process.env.ROUND_INTERVAL_MINUTES,
  },
};
