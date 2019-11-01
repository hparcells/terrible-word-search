import wordsearch from 'wordsearch';

import { WordSearchStateActionObject } from '../actions';
import { WordSearchSize } from './word-search-options';

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

    newState.wordsearch = wordsearch(
      [action.options.word],
      action.options.size.width,
      action.options.size.height,
      { letters: action.options.word }
    ).grid;

    return newState;
  }

  return state;
}
