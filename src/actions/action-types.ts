import { WordSearchOptions } from '../reducers/word-search-options';

export type WordSeachOptionsActionObject
  = { type: 'CHANGE_WORD', word: string }
  | { type: 'CHANGE_WIDTH', width: number }
  | { type: 'CHANGE_HEIGHT', height: number };

// tslint:disable-next-line: interface-over-type-literal
export type WordSearchStateActionObject
  = { type: 'GENERATE', options: WordSearchOptions };

export type ActionObject = WordSeachOptionsActionObject | WordSearchStateActionObject;
