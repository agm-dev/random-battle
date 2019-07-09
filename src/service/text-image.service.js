/* eslint-disable no-plusplus */
const text2png = require('text2png');
const { paddText } = require('../utils/text');

const DEFAULT_OPTIONS = {
  backgroundColor: 'white',
  output: 'dataURL',
};

const createImage = (textContent, options = {}) => {
  const imageOptions = Object.assign({}, DEFAULT_OPTIONS, options);
  return text2png(textContent, imageOptions);
};

const formatImageContent = (warriors = []) => {
  if (!warriors.length) {
    return '';
  }

  const COLUMNS = 3;
  const MAX_NAME_LENGTH = 30;

  return warriors.reduce((final, current, index) => {
    const field = paddText(current.name, MAX_NAME_LENGTH, { strike: !current.alive });
    return index > 0 && index % COLUMNS === 0 ? `${final}\n${field}` : `${final}${field}`;
  }, '');
};

module.exports = {
  createImage,
  formatImageContent,
};
