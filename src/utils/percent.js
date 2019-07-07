const getPercentFromTwoValues = (a, b) => {
  const total = a + b;
  return a * 100 / total;
};

module.exports = {
  getPercentFromTwoValues,
};
