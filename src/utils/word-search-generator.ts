import { randomOf } from '@reverse/random';
import { removeAt } from '@reverse/array';

import { WordSearchGenerationOptions } from '../reducers/word-search-state';

export function generateTerribleWordSearch(options: WordSearchGenerationOptions): string[][] {
  if(options.word.length < 3) {
    throw new Error('Cannot generate a word search with a word less than three characters.');
  }
  if(options.word.length > options.size.width || options.word.length > options.size.height) {
    throw new Error('Cannot generate a word seach with the word bigger than the dimensions.');
  }

  const wordSearch: string[][] = [];

  let occurances = 0;
  do {
    // Reset occurances count.
    occurances = 1;

    // Fill the array.
    for(let row = 0; row < options.size.height; row++) {
      wordSearch.push([]);
      for(let letter = 0; letter < options.size.width; letter++) {
        wordSearch[row][letter] = randomOf(options.word.split(''));
      }
    }

    // Check the number of occurances of the word.
    // For each row...
    wordSearch.forEach((row, rowIndex) => {
      // For each letter...
      row.forEach((letter, letterIndex) => {
        let lettersToCheckFor = options.word.split('');

        // Check if we need to continue the search.
        if(letter === lettersToCheckFor[0]) {
          lettersToCheckFor = removeAt(lettersToCheckFor, 0);

          // Check if the letter above us is the next letter.
          if(rowIndex + 1 >= options.word.length && wordSearch[rowIndex - 1][letterIndex] === lettersToCheckFor[0]) {}
          // Check if the letter to the right of us is the next letter.
          if((row.length - letterIndex) - 1 >= options.word.length && wordSearch[rowIndex][letterIndex + 1] === lettersToCheckFor[0]) {}
          // Check if the letter below us is the next letter.
          if((wordSearch.length - rowIndex) - 1 >= options.word.length && wordSearch[rowIndex + 1][letterIndex] === lettersToCheckFor[0]) {}
          // Check if the letter to the left of us is the next letter.
          if(letterIndex + 1 >= options.word.length && wordSearch[rowIndex][letterIndex - 1] === lettersToCheckFor[0]) {}

          // Check if the letter above us and to the right is the next letter.
          if(
            rowIndex + 1 >= options.word.length
            && (row.length - letterIndex) - 1 >= options.word.length
            && wordSearch[rowIndex - 1][letterIndex + 1] === lettersToCheckFor[0]
          ) {}
          // Check if the letter below us and to the right is the next letter.
          if(
            (wordSearch.length - rowIndex) - 1 >= options.word.length
            && (row.length - letterIndex) - 1 >= options.word.length
            && wordSearch[rowIndex + 1][letterIndex + 1] === lettersToCheckFor[0]
          ) {}
          // Check if the letter below us and to the left is the next letter.
          if(
            (wordSearch.length - rowIndex) - 1 >= options.word.length
            && letterIndex + 1 >= options.word.length
            && wordSearch[rowIndex + 1][letterIndex - 1] === lettersToCheckFor[0]
          ) {}
          // Check if the letter above us and to the left is the next letter.
          if(
            rowIndex + 1 >= options.word.length
            && letterIndex + 1 >= options.word.length
            && wordSearch[rowIndex - 1][letterIndex - 1] === lettersToCheckFor[0]
          ) {}
        }
      });
    });
  }while(occurances !== 1);

  return wordSearch;
}
