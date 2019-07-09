const { readFileSync } = require('fs');
const { game: { playersJSON } } = require('../config/vars');

exports.readJSON = (path) => {
  const content = readFileSync(require.resolve(path));
  return JSON.parse(content);
};

exports.loadPlayersData = () => {
  const jsonData = this.readJSON(playersJSON);
  return jsonData.map((row) => {
    const [name, twitter] = row;
    return { name, twitter };
  });
};
