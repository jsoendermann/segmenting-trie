/// <reference path="../typings/globals/jest/index.d.ts" />
/// <reference path="../typings/globals/node/index.d.ts" />

describe('Trie', function () {
  const { Trie } = require('../index.ts');

  it('should bla', function () {


const t = new Trie(['a', 'abc']);
console.log(t.splitText('ababcc'));
    expect(true).toBeTruthy();
  })
});