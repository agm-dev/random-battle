const Battleground = require('../src/model/battleground');
const Warrior = require('../src/model/warrior');

const warriorsData = [
  { name: 'warrior 1' },
  { name: 'warrior 2' },
  { name: 'warrior 3' },
];

const warriors = warriorsData.map((data) => new Warrior(data));

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
});

describe('round method', () => {
  const initialWarriors = [...battleground.warriors];
  const [winner, loser] = battleground.round();

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
});
