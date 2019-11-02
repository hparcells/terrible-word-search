import { WordSearchStateActionObject } from '../actions';
import { WordSearchSize } from './word-search-options';

import { generateTerribleWordSearch } from '../utils/word-search-generator';

export interface WordSearchGenerationOptions {
  word: string;
  size: WordSearchSize;
}
export interface WordSearchState {
  wordsearch: string[][];
}

const initialState: WordSearchState = {
  wordsearch: []
};

export default function(state: WordSearchState = initialState, action: WordSearchStateActionObject) {
  if(action.type === 'GENERATE') {
    const newState = { ...state };

    newState.wordsearch = generateTerribleWordSearch({
      word: action.options.word,
      size: {
        width: action.options.size.width,
        height: action.options.size.height
      }
    });

    return newState;
  }

  return state;
}
