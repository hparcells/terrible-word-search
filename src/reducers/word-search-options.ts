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
    width: 35,
    height: 35
  }
};

function wordSearchOptionsReducer(state: WordSearchOptions = initialState, action: WordSeachOptionsActionObject) {
  if(action.type === 'CHANGE_WORD') {
    const newState = { ...state };

    // Capitalize the word.
    newState.word = action.word.toUpperCase();

    // Remove the spaces.
    newState.word = newState.word.replace(/\W/g, '');

    if(newState.size.width < newState.word.length) {
      newState.size.width = newState.word.length;
    }
    if(newState.size.height < newState.word.length) {
      newState.size.height = newState.word.length;
    }

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
