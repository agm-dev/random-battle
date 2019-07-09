const { readFileSync } = require('fs');

exports.readJSON = (path) => {
  const content = readFileSync(require.resolve(path));
  return JSON.parse(content);
};
