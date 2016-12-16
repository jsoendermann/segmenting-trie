/// <reference path="../node_modules/@types/jest/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

describe('SegmentingTrie', () => {
  const { SegmentingTrie } = require('../SegmentingTrie');

  it('should find the first word if there is one', () => {
    const t = new SegmentingTrie(['a', 'ab', 'ac']);

    expect(t.getFirstWordInText('abc')).toEqual('ab');
  });

  it('should return null if there is no first word', () => {
    const t = new SegmentingTrie(['a', 'ab', 'ac']);

    expect(t.getFirstWordInText('dabc')).toBeNull();
  });

  it('should return null as first word of an emptry string', () => {
    const t = new SegmentingTrie(['a', 'b']);

    expect(t.getFirstWordInText('')).toBeNull();
  })

  it('should get the segment at the given index', () => {
    const t = new SegmentingTrie(['a', 'ab', 'b']);

    expect(t.getSegmentAtIndex('aabb', 2)).toEqual({
      str: 'ab',
      isInDict: true,
    });
  });

  it('should return an appropriate segment if there is no word at the index', () => {
    const t = new SegmentingTrie(['a', 'ab', 'b']);

    expect(t.getSegmentAtIndex('aa42bb', 2)).toEqual({
      str: '4',
      isInDict: false,
    });
  });

  it('should handle empty texts', () => {
    const t = new SegmentingTrie(['a', 'b']);

    expect(t.segmentText('')).toEqual([]);
  });

  it('should handle empty word lists', () => {
    const t = new SegmentingTrie([]);

    expect(t.segmentText('a')).toEqual([
      {
        str: 'a',
        isInDict: false,
      },
    ]);
  });

  it('should remove empty strings in word lists', () => {
    const t = new SegmentingTrie(['', 'a']);

    expect(t.segmentText('ab')).toEqual([
      {
        str: 'a',
        isInDict: true,
      },
      {
        str: 'b',
        isInDict: false,
      },
    ]);
  });

  it('should not merge words that are not in the dict', () => {
    const t = new SegmentingTrie(['a']);

    expect(t.segmentText('a42a')).toEqual([
      {
        str: 'a',
        isInDict: true,
      },
      {
        str: '4',
        isInDict: false,
      },
      {
        str: '2',
        isInDict: false,
      },
      {
        str: 'a',
        isInDict: true,
      },
    ]);
  })

  it('should handle texts that are prefixes of words in the dict', () => {
    const t = new SegmentingTrie(['abc']);

    expect(t.segmentText('ab')).toEqual([
      {
        str: 'a',
        isInDict: false,
      },
      {
        str: 'b',
        isInDict: false,
      }
    ]);
  });
});
