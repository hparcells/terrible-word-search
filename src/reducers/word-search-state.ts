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
  wordsearch: [],
  word: ''
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
