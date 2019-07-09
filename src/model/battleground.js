const Warrior = require('./warrior');
const { getTwoRandomItems } = require('../utils/random');

class Battleground {
  constructor({ warriors }) {
    this.initWarriors(warriors);
    this.rounds = 0;
  }

  initWarriors(data = []) {
    this.warriors = data.map((item) => {
      if (item instanceof Warrior) {
        return item;
      }
      return new Warrior(item);
    });
  }

  getAlive() {
    return this.warriors.filter(warrior => warrior.alive === true);
  }

  round() {
    this.rounds = this.rounds + 1;
    const alive = this.warriors.filter(warrior => warrior.alive === true);
    if (alive.length === 1) {
      return [alive[0], null];
    }

    const [warrior1, warrior2] = getTwoRandomItems(alive);
    const winner = warrior1.fight(warrior2);
    const loser = [warrior1, warrior2].find(warrior => warrior.name !== winner.name);

    this.warriors = this.warriors.map((warrior) => {
      const modifiedWarrior = warrior;
      if (warrior.name === loser.name) {
        modifiedWarrior.alive = false;
      }
      return modifiedWarrior;
    });

    return [winner, loser];
  }
}

module.exports = Battleground;
