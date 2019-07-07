class Twitter {
  constructor({ client, secret }) {
    this.client = client;
    this.secret = secret;
  }

  log(text = '', data = null) {
    // TODO: use twitter client to send a tweet
  }
}

module.exports = Twitter;
