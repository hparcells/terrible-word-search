import syncReducer from 'sync-reducer';

import { WordSeachOptionsActionObject } from '../actions';

export interface WordSearchSize {
  width: number;
  height: number;
}
export interface WordSearchOptions {
  word: string;
  size: WordSearchSize;
}

const initialState: WordSearchOptions = {
  word: '',
  size: {
    width: 25,
    height: 20
  }
};

function wordSearchOptionsReducer(state: WordSearchOptions = initialState, action: WordSeachOptionsActionObject) {
  if(action.type === 'CHANGE_WORD') {
    const newState = { ...state };

    // Capitalize the word.
    newState.word = action.word.toUpperCase();

    // Remove the spaces.
    newState.word = newState.word.replace(/\W/g, '');

    return newState;
  }
  if(action.type === 'CHANGE_WIDTH') {
    const newState = { ...state };

    newState.size.width = action.width;

    return newState;
  }
  if(action.type === 'CHANGE_HEIGHT') {
    const newState = { ...state };

    newState.size.height = action.height;

    return newState;
  }

  return state;
}

export default syncReducer(wordSearchOptionsReducer, 'word-search-options');
