/* eslint-disable no-plusplus */
const text2png = require('text2png');
const { paddText, strikeText } = require('../utils/text');

const DEFAULT_OPTIONS = {
  backgroundColor: 'white',
  output: 'dataURL',
  padding: 10,
};

const createImage = (textContent, options = {}) => {
  const imageOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  return text2png(textContent, imageOptions);
};

const formatImageContent = (warriors = [], { format = 'list' } = {}) => {
  if (!warriors.length) {
    return '';
  }

  // this works well on console, but the text2png lib breaks the format on image :/
  if (format === 'three-columns') {
    const COLUMNS = 3;
    const MAX_NAME_LENGTH = 30;
    return warriors.reduce((final, current, index) => {
      const field = paddText(current.name, MAX_NAME_LENGTH, { strike: !current.alive });
      return index > 0 && index % COLUMNS === 0 ? `${final}\n${field}` : `${final}${field}`;
    }, '');
  }

  const alive = warriors
    .filter(warrior => warrior.alive)
    .reduce((final, warrior) => `${final}\n${warrior.name}`, 'Alive: \n');

  const defeated = warriors
    .filter(warrior => !warrior.alive)
    .reduce((final, warrior) => `${final}\n${strikeText(warrior.name)}`, 'Defeated: \n');

  return `${alive}\n\n${defeated}`;
};

module.exports = {
  createImage,
  formatImageContent,
};
