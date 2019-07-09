const Warrior = require('../src/model/warrior');

const warriorData = {
  name: 'test warrior',
};

describe('Warrior', () => {
  const warrior = new Warrior(warriorData);
  const secondWarrior = new Warrior({ name: 'test warrior 2' });

  test('can create an instance', () => {
    expect(warrior).toBeInstanceOf(Warrior);
  });

  test('instance has name property', () => {
    expect(warrior).toHaveProperty('name');
    expect(warrior.name).toBeDefined();
    expect(typeof warrior.name).toBe('string');
    expect(warrior.name.length).toBeGreaterThan(0);
  });

  test('instance name is the same that was provided in the constructor', () => {
    expect(warrior.name).toBe(warriorData.name);
  });

  test('instance has strength value', () => {
    expect(warrior).toHaveProperty('strength');
    expect(warrior.strength).toBeDefined();
    expect(typeof warrior.strength).toBe('number');
    expect(warrior.strength).toBeGreaterThan(0);
  });

  test('instance has alive property', () => {
    expect(warrior).toHaveProperty('alive');
    expect(warrior.alive).toBeTruthy();
  });

  test('instance has a twitter property', () => {
    expect(warrior).toHaveProperty('twitter');
    expect(warrior.twitter).toBeDefined();
    expect(typeof warrior.twitter).toBe('string');
  });

  test('instance has fight method', () => {
    expect(warrior).toHaveProperty('fight');
    expect(typeof warrior.fight).toBe('function');
  });

  const winner = warrior.fight(secondWarrior);

  test('fight method returns a Warrior instance', () => {
    expect(winner).toBeInstanceOf(Warrior);
  });

  test('fight method returns one of the two warriors', () => {
    expect([warrior.name, secondWarrior.name]).toContain(winner.name);
  });
});
