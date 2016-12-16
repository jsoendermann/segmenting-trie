export interface Node {
  isWord: boolean;
  children: { [char: string]: Node },
}

export interface Segment {
  word: string;
  isInDict: boolean;
}

export class Trie {
  private head: Node;

  constructor(words: string[]) {
    this.head = {
      isWord: false,
      children: {},
    };

    words.forEach(word => {
      let currentNode = this.head;

      word.split('').forEach(char => {
        if (currentNode.children[char] === undefined) {
          currentNode.children[char] = {
            isWord: false,
            children: {}
          };

        }
        currentNode = currentNode.children[char];
      });

      currentNode.isWord = true;
    });
  }

  splitText(text: string) {
    let lastCompleteWord = '';
    let charactersSinceLastCompletedWord = '';

    let currentNode = this.head;

    const feedChar = (char: string) => {
      const result: Segment[] = [];

      charactersSinceLastCompletedWord += char;

      const nextNode = currentNode.children[char];

      if (nextNode === undefined) {
        if (lastCompleteWord === '') {
          const firstChar = charactersSinceLastCompletedWord[0];
          result.push({ word: firstChar, isInDict: false });
          result.push(...feedString(charactersSinceLastCompletedWord.slice(1)));
        } else {
          result.push({ word: lastCompleteWord, isInDict: true});
          result.push(...feedString(charactersSinceLastCompletedWord));
        }
      } else {
        currentNode = nextNode;

        if (nextNode.isWord) {
          lastCompleteWord += charactersSinceLastCompletedWord;
          charactersSinceLastCompletedWord = '';
        }
      }

      return result;
    };

    const feedString = (str: string) => {
      const result: Segment[] = [];

      currentNode = this.head;
      lastCompleteWord = '';
      charactersSinceLastCompletedWord = '';

      str.split('').forEach(char => {
        const feedCharResult = feedChar(char);

        result.push(...feedCharResult);
      });

      return result;
    };

    const result = feedString(text);
    while (currentNode !== this.head) {
      result.push({ word: lastCompleteWord, isInDict: true});
      result.push(...feedString(charactersSinceLastCompletedWord));
    }

    return result;
  }
}
