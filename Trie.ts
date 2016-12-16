interface Node {
  isWord: boolean;
  children: { [char: string]: Node },
}

export interface Segment {
  str: string;
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

  getFirstWordInText(text: string): string | null {
    let currentNode = this.head;
    let currentWord = null;

    for (const char of text.split('')) {
      const nextNode = currentNode.children[char];

      if (nextNode === undefined) {
        return currentWord;
      }

      currentNode = nextNode;
      if (nextNode.isWord) {
        if (currentWord === null) {
          currentWord = char;
        } else {
          currentWord += char;
        }
      }
    }

    return currentWord;
  }

  getSegmentAtIndex(text: string, index: number): Segment | null {
    if (index < 0 || index >= text.length) {
      return null;
    }
    
    let segment = null;

    while (index >= 0) {
      const firstWord = this.getFirstWordInText(text);

      if (firstWord === null) {
        segment = {
          str: text[0],
          isInDict: false,
        };

        index--;
        text = text.slice(1);
      } else {
        segment = {
          str: firstWord,
          isInDict: true,
        };
        index -= firstWord.length;
        text = text.slice(firstWord.length);
      }
    }

    return segment;
  }

  segmentText(text: string): Segment[] {
    const result: Segment[] = [];

    while (text.length > 0) {
      const firstWord = this.getFirstWordInText(text);

      if (firstWord === null) {
        result.push({
          str: text[0],
          isInDict: false,
        });

        text = text.slice(1);
      } else {
        result.push({
          str: firstWord,
          isInDict: true,
        });

        text = text.slice(firstWord.length);
      }
    }

    return result;
  }
}
