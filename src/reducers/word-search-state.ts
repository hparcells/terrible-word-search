import syncReducer from 'sync-reducer';

import { WordSearchStateActionObject } from '../actions';
import { WordSearchSize } from './word-search-options';

import { generateTerribleWordSearch } from '../utils/word-search-generator';

export interface WordSearchGenerationOptions {
  word: string;
  size: WordSearchSize;
}
export interface WordSearchState {
  wordsearch: string[][];
  word: string;
}

const initialState: WordSearchState = {
  wordsearch: [["A","K","A","Y","A","Y","A","A","K","Y","A","A","K","A","K","K","K","K","A","A","A","A","K","A","A"],["A","Y","K","K","Y","Y","A","K","Y","A","A","A","K","Y","K","A","K","K","Y","Y","Y","Y","A","A","A"],["A","K","A","K","Y","A","A","Y","Y","Y","A","A","A","A","K","Y","A","Y","Y","Y","K","K","K","A","A"],["Y","A","Y","K","K","K","K","A","K","Y","K","A","Y","Y","Y","Y","A","K","Y","K","K","Y","Y","Y","K"],["K","A","A","A","A","A","Y","Y","A","Y","A","A","A","A","Y","A","Y","Y","K","A","K","A","K","K","A"],["A","K","A","Y","K","K","A","A","K","Y","A","K","A","K","A","Y","Y","Y","Y","A","Y","K","Y","K","K"],["A","Y","A","A","K","Y","K","A","Y","K","K","K","K","Y","K","K","Y","K","A","Y","A","K","Y","A","K"],["Y","Y","K","A","Y","Y","Y","Y","Y","A","A","Y","K","K","Y","K","K","Y","A","Y","A","Y","A","K","Y"],["K","Y","A","A","K","A","A","Y","Y","K","A","Y","Y","A","Y","Y","Y","K","K","Y","A","K","K","K","K"],["K","K","A","Y","Y","Y","Y","Y","K","Y","A","A","Y","Y","K","A","Y","K","A","K","Y","Y","Y","A","A"],["K","K","K","Y","K","K","Y","Y","A","Y","K","A","Y","K","Y","Y","Y","A","A","Y","A","K","A","K","A"],["A","K","A","Y","A","Y","Y","A","K","K","K","K","Y","Y","Y","A","K","Y","A","K","K","Y","A","A","Y"],["K","K","A","Y","A","A","K","A","Y","K","Y","K","K","Y","Y","Y","K","Y","A","A","Y","Y","A","Y","K"],["Y","A","Y","K","Y","A","K","K","K","K","Y","A","K","K","Y","Y","A","Y","A","A","A","A","Y","A","K"],["K","Y","K","A","Y","Y","K","K","K","K","K","K","Y","K","A","A","K","K","K","A","Y","Y","K","A","K"],["A","K","Y","Y","Y","K","K","Y","Y","Y","Y","K","K","K","K","Y","K","Y","A","A","A","Y","K","Y","A"],["Y","A","K","K","K","Y","A","A","A","A","Y","Y","A","K","Y","A","A","A","Y","K","Y","K","K","K","Y"],["Y","A","Y","A","Y","K","A","A","K","A","K","A","A","Y","K","Y","Y","A","K","Y","K","K","Y","K","Y"],["A","A","K","K","A","Y","Y","A","Y","Y","K","K","A","A","K","A","A","A","A","A","K","Y","A","Y","K"],["K","A","K","K","Y","A","K","Y","A","Y","K","A","K","K","K","K","Y","K","Y","K","A","K","A","A","A"]],
  word: 'KAYAK'
};

function wordSearchStateReducer(state: WordSearchState = initialState, action: WordSearchStateActionObject) {
  if(action.type === 'GENERATE') {
    const newState = { ...state };

    newState.wordsearch = generateTerribleWordSearch({
      word: action.options.word,
      size: {
        width: action.options.size.width,
        height: action.options.size.height
      }
    });
    newState.word = action.options.word;

    return newState;
  }

  return state;
}

export default syncReducer(wordSearchStateReducer, 'word-search-state');
