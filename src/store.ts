import { createStore } from 'redux';

import rootReducer from './reducers';
import { WordSearchOptions } from './reducers/word-search-options';
import { WordSearchState } from './reducers/word-search-state';

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
  rootReducer,
  reduxDevTools ? reduxDevTools() : undefined
);

export default store;

export interface Store {
  options: WordSearchOptions;
  wordsearch: WordSearchState;
}
