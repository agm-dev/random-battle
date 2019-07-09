/* eslint-disable no-console */
class Console {
  constructor({ prefix }) {
    this.prefix = prefix;
  }

  log(text = '', media = '') {
    const message = `${this.prefix} ${text}`;
    if (media !== null) {
      console.log(message, media);
    } else {
      console.log(message);
    }
  }

  printReport(text = '', media = '') {
    const prefix = `${this.prefix}\n\n`;
    console.log(`${prefix}${text}`);
    if (media.length) {
      console.log(`${prefix}${media}`);
    }
  }
}

module.exports = Console;
