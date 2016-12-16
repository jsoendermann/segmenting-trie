/// <reference path="../node_modules/@types/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

describe('Trie', () => {
  const { Trie } = require('../Trie');

  it('should handle empty texts', () => {
    const t = new Trie(['a', 'b']);

    expect(t.splitText('')).toEqual([]);
  });

  it('should handle empty word lists', () => {
    const t = new Trie([]);

    expect(t.splitText('ab')).toEqual([
      {
        word: 'ab',
        isInDict: false,
      },
    ]);
  });

  it('should remove empty strings in word lists', () => {
    const t = new Trie(['', 'a']);

    expect(t.splitText('ab')).toEqual([
      {
        word: 'a',
        isInDict: true,
      },
      {
        word: 'b',
        isInDict: false,
      },
    ]);
  });

  it('should merge words that are not in the dict', () => {
    const t = new Trie(['a']);

    expect(t.splitText('a2016a')).toEqual([
      {
        word: 'a',
        isInDict: true,
      },
      {
        word: '2016',
        isInDict: false,
      },
      {
        word: 'a',
        isInDict: true,
      },
    ]);
  })

  it('should handle texts that are prefixes of words in the dict', () => {
    const t = new Trie(['abc']);

    expect(t.splitText('ab')).toEqual([
      {
        word: 'ab',
        isInDict: false,
      }
    ]);
  });
});
