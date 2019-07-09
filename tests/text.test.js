const {
  generateSpaces,
  strikeText,
  paddText,
} = require('../src/utils/text');

describe('Text utils', () => {
  test('generateSpaces is a function', () => {
    expect(generateSpaces).toBeDefined();
    expect(typeof generateSpaces).toBe('function');
  });

  test('strikeText is a function', () => {
    expect(strikeText).toBeDefined();
    expect(typeof strikeText).toBe('function');
  });

  test('paddText is a function', () => {
    expect(paddText).toBeDefined();
    expect(typeof paddText).toBe('function');
  });

  test('generateSpaces returns string of N spaces', () => {
    const lengths = [2, 5, 10, 20];
    lengths.forEach((length) => {
      const result = generateSpaces(length);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(length);
      const replaced = result.replace(/ /g, '');
      expect(replaced.length).toBe(0);
    });
  });

  const texts = ['hi', 'bye', 'test', 'hello world!'];
  test('strikeText injects strike char before every character', () => {
    texts.forEach((text) => {
      const result = strikeText(text);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(text.length * 2);
    });
  });

  test('paddText returns a string of the max length which fills remaining space with blanks', () => {
    const otherTexts = [
      ...texts,
      'need a longer string to test',
    ];

    otherTexts.forEach((text) => {
      const MAX = 15;
      const result = paddText(text, MAX, { strike: false });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(MAX);
      const spaces = result.replace(text, '');
      const expectedMax = text.length > MAX ? MAX : MAX - text.length;
      expect(spaces.length).toBe(expectedMax);
    });
  });
});
