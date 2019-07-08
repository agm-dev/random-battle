const Twit = require('twit');
const { twitter } = require('../config/vars');

const T = new Twit({
  ...twitter,
  timeout_ms: 60 * 1000,
});

const tweet = (text = '') => {
  return new Promise((resolve, reject) => {
    if (!text.length) {
      reject(new Error('provide a longer text'));
    }

    T.post(
      'statuses/update',
      { status: text },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
};

module.exports = {
  tweet,
};
