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
    width: 10,
    height: 10
  }
};

export default function(state: WordSearchOptions = initialState, action: WordSeachOptionsActionObject) {
  if(action.type === 'CHANGE_WORD') {
    const newState = { ...state };

    // Capitalize the word.
    newState.word = action.word.toUpperCase();

    // Remove the spaces.
    newState.word = newState.word.replace(/\W/g, '');

    return newState;
  }

  return state;
}
