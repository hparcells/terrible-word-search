import { WordSearchOptions } from '../reducers/word-search-options';

// tslint:disable-next-line: interface-over-type-literal
export type WordSeachOptionsActionObject
  = { type: 'CHANGE_WORD', word: string };

// tslint:disable-next-line: interface-over-type-literal
export type WordSearchStateActionObject
  = { type: 'GENERATE', options: WordSearchOptions };

export type ActionObject = WordSeachOptionsActionObject | WordSearchStateActionObject;
