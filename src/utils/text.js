const generateSpaces = num => [...Array(num)].reduce(result => `${result} `, '');

const strikeText = (text = '') => text.split('').reduce((final, current) => `${final}\u0336${current}`, '');

const paddText = (text = '', max = 10, { strike }) => {
  const maxAllowed = max - 2;
  if (text.length > maxAllowed) {
    const subText = text.substr(0, maxAllowed);
    const formatted = strike ? strikeText(subText) : subText;
    return `${formatted}${generateSpaces(max - maxAllowed)}`;
  }
  return `${strike ? strikeText(text) : text}${generateSpaces(max - text.length)}`;
};

const getWarriorDisplayText = ({ name = '', twitter = '' }) => {
  if (!name.length) {
    return '';
  }
  const formattedName = name.split('')[0].toUpperCase() + name.substr(1);
  return twitter.length ? `${formattedName} (${twitter})` : `${formattedName}`;
};

module.exports = {
  generateSpaces,
  strikeText,
  paddText,
  getWarriorDisplayText,
};
