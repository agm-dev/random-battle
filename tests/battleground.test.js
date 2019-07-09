const Battleground = require('../src/model/battleground');
const Warrior = require('../src/model/warrior');

const warriorsDataLength = 11;
const warriorsGen = (result, current, index) => [...result, { name: `warrior ${index + 1}` }];
const warriorsData = [...Array(warriorsDataLength - 1)].reduce(warriorsGen, []);

const warriors = warriorsData.map(data => new Warrior(data));

const data = {
  title: 'test battle',
  warriors,
};

const battleground = new Battleground(data);

describe('Battleground', () => {
  test('can create an instance', () => {
    expect(battleground).toBeInstanceOf(Battleground);
  });

  test('instance has title property', () => {
    expect(battleground).toHaveProperty('title');
    expect(battleground.title).toBeDefined();
    expect(typeof battleground.title).toBe('string');
    expect(battleground.title.length).toBeGreaterThan(0);
  });

  test('instance has rounds property', () => {
    expect(battleground).toHaveProperty('rounds');
    expect(battleground.rounds).toBeDefined();
    expect(typeof battleground.rounds).toBe('number');
    expect(battleground.title.length).toBeGreaterThanOrEqual(0);
  });

  test('instance title is the same that was provided in the constructor', () => {
    expect(battleground.title).toBe(data.title);
  });

  test('instance has warriors property', () => {
    expect(battleground).toHaveProperty('warriors');
    expect(Array.isArray(battleground.warriors)).toBeTruthy();
  });

  test('instance has at least 2 warriors', () => {
    expect(battleground.warriors.length).toBeGreaterThanOrEqual(2);
  });

  test('warriors property contains Warrior instances', () => {
    battleground.warriors.forEach((item) => {
      expect(item).toBeInstanceOf(Warrior);
    });
  });

  test('instance has round method', () => {
    expect(battleground).toHaveProperty('round');
    expect(typeof battleground.round).toBe('function');
  });

  test('instance has getAlive method', () => {
    expect(battleground).toHaveProperty('getAlive');
    expect(typeof battleground.getAlive).toBe('function');
  });

  test('getAlive returns the alive warriors', () => {
    const alive = battleground.getAlive();
    alive.forEach((warrior) => {
      expect(warrior.alive).toBeTruthy();
    });
    const aliveWarriors = battleground.warriors.filter(warrior => warrior.alive === true);
    expect(alive.length).toBe(aliveWarriors.length);
  });
});

describe('round method', () => {
  // to clone the objects inside the array without reference...
  const initialWarriors = battleground.warriors.map(item => ({ ...item }));
  const roundsBeforeRound = battleground.rounds;
  const [winner, loser] = battleground.round();
  const roundsAfterRound = battleground.rounds;

  test('increases rounds value by 1', () => {
    expect(roundsAfterRound).toBe(roundsBeforeRound + 1);
  });

  test('returns an array with [winner, loser]', () => {
    expect(winner).toBeInstanceOf(Warrior);
    expect(loser).toBeInstanceOf(Warrior);
    expect(winner.alive).toBeTruthy();
    expect(loser.alive).toBeFalsy();
  });

  test('warriors property is modified: the loser is not alive anymore', () => {
    expect(initialWarriors.length).toBe(battleground.warriors.length);
    battleground.warriors.forEach((warrior) => {
      if (warrior.name === loser.name) {
        expect(warrior.alive).toBeFalsy();
      } else if (warrior.name === winner.name) {
        expect(warrior.alive).toBeTruthy();
      }
    });
  });

  test('if only one warrior alive, loser is null', () => {
    const onlyOne = new Warrior({ name: 'the only one' });
    const instanceData = {
      title: 'another battleground',
      warriors: [onlyOne],
    };
    const otherBattle = new Battleground(instanceData);
    const [onlyWinner, nullLoser] = otherBattle.round();
    expect(nullLoser).toBeNull();
    expect(onlyWinner.name).toBe(onlyOne.name);
  });

  test('alive warriors decreases by 1 each round', () => {
    const getAlive = warrior => warrior.alive === true;
    const initialAlive = initialWarriors.filter(getAlive);
    const current = battleground.getAlive();
    expect(current.length + 1).toBe(initialAlive.length);

    while (battleground.warriors.filter(getAlive).length > 1) {
      const source = battleground.warriors.map(item => ({ ...item }));
      const initial = source.filter(getAlive);
      battleground.round();
      const alive = battleground.getAlive();
      expect(alive.length + 1).toBe(initial.length);
    }
  });
});
