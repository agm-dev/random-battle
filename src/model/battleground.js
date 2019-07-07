const Warrior = require('./warrior');
const { getTwoRandomItems } = require('../utils/random');

class Battleground {
  constructor({ title, warriors }) {
    this.title = title;
    this.warriors = this.initWarriors(warriors);
  }

  initWarriors(data = []) {
    return data.map((item) => {
      if (item instanceof Warrior) {
        return item;
      }
      return new Warrior(item);
    });
  }

  getAlive() {
    return this.warriors.filter((warrior) => warrior.alive === true);
  }

  round() {
    const alive = this.warriors.filter((warrior) => warrior.alive === true);
    if (alive.length === 1) {
      return [alive[0], null];
    }

    const [warrior1, warrior2] = getTwoRandomItems(alive);
    const winner = warrior1.fight(warrior2);
    const loser = [warrior1, warrior2].find((warrior) => warrior.name !== winner.name);

    this.warriors = this.warriors.map((warrior) => {
      if (warrior.name === loser.name) {
        warrior.alive = false;
      }
      return warrior;
    });

    return [winner, loser];
  }
}

module.exports = Battleground;
