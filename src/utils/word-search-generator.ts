import { randomOf } from '@reverse/random';
import { removeAt, unique } from '@reverse/array';

import { WordSearchGenerationOptions } from '../reducers/word-search-state';

type Direction = 'UP' | 'UP_RIGHT' | 'RIGHT' | 'DOWN_RIGHT' | 'DOWN' | 'DOWN_LEFT' | 'LEFT' | 'UP_LEFT';

interface WordSearchAnswer {
  x: number;
  y: number;
  direction: Direction;
}

const MAX_ATTEMPTS = 7500;

export function generateTerribleWordSearch(options: WordSearchGenerationOptions): string[][] {
  if(options.word.length < 3) {
    throw new Error('Cannot generate a word search with a word less than three characters.');
  }
  if(
    (
      (options.word.length > options.size.height && options.word.length < options.size.width)
      && (options.word.length > options.size.width && options.word.length < options.size.height)
    )
    || options.word.length > options.size.width && options.word.length > options.size.height
  ) {
    throw new Error('Cannot generate a word seach with the word bigger than the dimensions.');
  }

  let wordSearch: string[][] = [];

  let occurances = 0;
  let attempts = 0;
  let answers: WordSearchAnswer[] = [];

  const searchingLetters = removeAt(options.word.split(''), 0);

  do {
    // Reset occurances count.
    occurances = 0;

    // Reset answers.
    answers = [];

    // Fill the array.
    wordSearch = [];
    for(let row = 0; row < options.size.height; row++) {
      wordSearch.push([]);
      for(let letter = 0; letter < options.size.width; letter++) {
        wordSearch[row][letter] = randomOf(unique(options.word.split('')));
      }
    }

    // debugger;

    // Check the number of occurances of the word.
    // For each row...
    wordSearch.forEach((row, rowIndex) => {
      // For each letter...
      row.forEach((letter, letterIndex) => {
        let lettersToCheckFor = options.word.split('');

        // Check if we need to continue the search.
        if(letter === lettersToCheckFor[0]) {
          lettersToCheckFor = removeAt(lettersToCheckFor, 0);

          let stopCheck = false;
          let lettersChecked = options.word.length - lettersToCheckFor.length;

          // Check if the letter above us is the next letter.
          if(rowIndex + 1 >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex - lettersChecked][letterIndex] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'UP'
              });
            }
          }
          // Check if the letter to the right of us is the next letter.
          if((row.length - letterIndex) >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex][letterIndex + lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'RIGHT'
              });
            }
          }
          // Check if the letter below us is the next letter.
          if((wordSearch.length - rowIndex) >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex + lettersChecked][letterIndex] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'DOWN'
              });
            }
          }
          // Check if the letter to the left of us is the next letter.
          if(letterIndex + 1 >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex][letterIndex - lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'LEFT'
              });
            }
          }

          // Check if the letter above us and to the right is the next letter.
          if(rowIndex + 1 >= options.word.length && (row.length - letterIndex) >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex - lettersChecked][letterIndex + lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'UP_RIGHT'
              });
            }
          }
          // Check if the letter below us and to the right is the next letter.
          if((wordSearch.length - rowIndex) >= options.word.length && (row.length - letterIndex) >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex + lettersChecked][letterIndex + lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'DOWN_RIGHT'
              });
            }
          }
          // Check if the letter below us and to the left is the next letter.
          if((wordSearch.length - rowIndex) >= options.word.length && letterIndex + 1 >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex + lettersChecked][letterIndex - lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'DOWN_LEFT'
              });
            }
          }
          // Check if the letter above us and to the left is the next letter.
          if(rowIndex + 1 >= options.word.length && letterIndex + 1 >= options.word.length) {
            stopCheck = false;
            lettersToCheckFor = searchingLetters;
            lettersChecked = options.word.length - lettersToCheckFor.length;

            do {
              if(wordSearch[rowIndex - lettersChecked][letterIndex - lettersChecked] === lettersToCheckFor[0]) {
                lettersToCheckFor = removeAt(lettersToCheckFor, 0);
                lettersChecked = options.word.length - lettersToCheckFor.length;
              }else {
                stopCheck = true;
              }
            }while(lettersChecked !== options.word.length && !stopCheck);

            if(lettersChecked === options.word.length) {
              occurances++;

              answers.unshift({
                x: letterIndex + 1,
                y: rowIndex + 1,
                direction: 'UP_LEFT'
              });
            }
          }
        }
      });
    });

    attempts++;
  }while(occurances !== 1 && attempts !== MAX_ATTEMPTS);

  if(attempts === MAX_ATTEMPTS) {
    throw new Error('Took too long to generate a word search.');
  }

  // tslint:disable-next-line: no-console
  console.log(
    `Finished with ${attempts} attempts with ${options.word} at (${answers[0].x}, ${answers[0].y}) going ${answers[0].direction}.
  `);

  return wordSearch;
}
