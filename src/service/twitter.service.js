const Twit = require('twit');
const { twitter } = require('../config/vars');

const T = new Twit({
  ...twitter,
  timeout_ms: 60 * 1000,
});

const tweet = (text = '', extra = {}) => {
  return new Promise((resolve, reject) => {
    if (!text.length) {
      reject(new Error('provide a longer text'));
    }

    T.post(
      'statuses/update',
      {
        status: text,
        ...extra,
      },
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

const uploadMedia = (base64image = '') => {
  return new Promise((resolve, reject) => {
    if (!base64image.length || base64image.indexOf('data:image/png;base64,') !== 0) {
      reject(new Error('provide a base64 image string'));
    }

    T.post(
      'media/upload',
      { media_data: base64image },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.media_id_string);
        }
      },
    );
  });
};

const tweetWithMedia = async (text = '', base64image = '') => {
  try {
    const mediaId = await uploadMedia(base64image);
    return await tweet(text, { media_ids: [mediaId] });
  } catch (err) {
    return null;
  }
};

module.exports = {
  tweet,
  uploadMedia,
  tweetWithMedia,
};
