const Console = require('./console');
const Twitter = require('./twitter');

class Logger {
  constructor(config) {
    this.init(config);
  }

  init({
    type,
    prefix,
    client,
    secret,
  }) {
    switch (type) {
      case 'twitter':
        this.client = new Twitter({ client, secret });
        break;
      default:
        this.client = new Console({ prefix });
    }
  }

  log(text = '', data = null) {
    this.client.log(text, data);
  }
}

module.exports = Logger;
