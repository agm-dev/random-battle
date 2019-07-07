const { getRandomNumber } = require('../utils/random');
const { getPercentFromTwoValues } = require('../utils/percent');

const STRENGTH_INITIAL_MAX_VALUE = 100;
const STRENGTH_INITIAL_MIN_VALUE = 1;

class Warrior {
  constructor({ name }) {
    this.name = name;
    this.strength = this.initStrength();
    this.alive = true;
  }

  initStrength() {
    const max = STRENGTH_INITIAL_MAX_VALUE;
    const min = STRENGTH_INITIAL_MIN_VALUE;
    return getRandomNumber(min, max);
  }

  fight(warrior = null) {
    if (warrior === null) {
      return this;
    }

    const firstWarriorWinProb = getPercentFromTwoValues(this.strength, warrior.strength);
    const random = getRandomNumber();

    if (random <= firstWarriorWinProb) {
      return this;
    }
    return warrior;
  }
}

module.exports = Warrior;
