const getRandomNumber = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomItem = (container = [], { index }) => {
  if (!container.length) {
    return null;
  }
  const max = container.length - 1;
  const randomIndex = getRandomNumber(0, max);
  return index ? [container[randomIndex], randomIndex] : container[randomIndex];
};

const getTwoRandomItems = (container = []) => {
  if (container.length < 2) {
    return [container[0], null];
  }

  const [first, firstIndex] = getRandomItem(container, { index: true });
  let second; let
    secondIndex;
  do {
    [second, secondIndex] = getRandomItem(container, { index: true });
  } while (secondIndex === firstIndex);
  return [first, second];
};

module.exports = {
  getRandomNumber,
  getRandomItem,
  getTwoRandomItems,
};
