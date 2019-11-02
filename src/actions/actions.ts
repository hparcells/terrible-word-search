import { WordSeachOptionsActionObject, WordSearchStateActionObject } from './action-types';
import { WordSearchGenerationOptions } from '../reducers/word-search-state';

export function changeWord(word: string): WordSeachOptionsActionObject {
  return { type: 'CHANGE_WORD', word };
}
export function changeWidth(width: number): WordSeachOptionsActionObject {
  return { type: 'CHANGE_WIDTH', width };
}
export function changeHeight(height: number): WordSeachOptionsActionObject {
  return { type: 'CHANGE_HEIGHT', height };
}

export function generate(options: WordSearchGenerationOptions): WordSearchStateActionObject {
  return { type: 'GENERATE', options };
}
