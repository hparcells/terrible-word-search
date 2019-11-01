import { WordSeachOptionsActionObject, WordSearchStateActionObject } from './action-types';
import { WordSearchGenerationOptions } from '../reducers/word-search-state';

export function changeWord(word: string): WordSeachOptionsActionObject {
  return { type: 'CHANGE_WORD', word };
}

export function generate(options: WordSearchGenerationOptions): WordSearchStateActionObject {
  return { type: 'GENERATE', options };
}
