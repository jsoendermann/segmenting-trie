interface Node {
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

    words.filter(w => w !== '').forEach(word => {
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
          result.push({ word: lastCompleteWord, isInDict: true });
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

    let charactersSinceLastCompletedWordLastIteration = charactersSinceLastCompletedWord;
    while (currentNode !== this.head) {
      if (lastCompleteWord !== '') {
        result.push({ word: lastCompleteWord, isInDict: true });
      }

      if (lastCompleteWord === '' && charactersSinceLastCompletedWordLastIteration === charactersSinceLastCompletedWord) {
        result.push({ word: charactersSinceLastCompletedWord[0], isInDict: false });
        charactersSinceLastCompletedWord = charactersSinceLastCompletedWord.slice(1);
      }
      result.push(...feedString(charactersSinceLastCompletedWord));

      charactersSinceLastCompletedWordLastIteration = charactersSinceLastCompletedWord
    }

    if (result.length === 0) {
      return result;
    }

    const resultWithWordsNotInDictMerged = result.slice(1).reduce((prev, current) => {
      const lastElement = prev[prev.length - 1]

      if (!lastElement.isInDict && !current.isInDict) {
        const prevWithoutLast = prev.slice(0, prev.length - 1);
        const newLast = {
          word: lastElement.word + current.word,
          isInDict: false,
        };

        return [...prevWithoutLast, newLast];
      }

      return [...prev, current];
    }, [result[0]]);

    return resultWithWordsNotInDictMerged;
  }
}
