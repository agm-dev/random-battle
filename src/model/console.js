/* eslint-disable no-console */
class Console {
  constructor({ prefix }) {
    this.prefix = prefix;
  }

  log(text = '', data = null) {
    const message = `${this.prefix} ${text}`;
    if (data !== null) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}

module.exports = Console;
