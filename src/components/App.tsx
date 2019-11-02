import React from 'react';
import { connect } from 'react-redux';

import { Store } from '../store';
import { changeWord, generate } from '../actions';
import { WordSearchOptions } from '../reducers/word-search-options';
import { WordSearchGenerationOptions } from '../reducers/word-search-state';

// TODO: Remove this line.
import { generateTerribleWordSearch } from '../utils/word-search-generator';

function App(
  { options, wordsearch, changeWord, generate }:
  {
    options: WordSearchOptions,
    wordsearch: string[][],
    changeWord: (word: string) => void,
    generate: (options: WordSearchGenerationOptions) => void
  }
) {
  function handleWordChange(event: any) {
    changeWord(event.target.value);
  }
  function handleGenerate() {
    generate({
      word: options.word,
      size: {
        width: options.size.width,
        height: options.size.height
      }
    });
  }

  // TODO: Remove this line.
  // tslint:disable-next-line: no-console
  console.log(generateTerribleWordSearch({ word: 'DOG', size: { width: 10, height: 10 } }));
  return (
    <div>
      <input type='text' value={options.word} onChange={handleWordChange} />
      <button onClick={handleGenerate}>Generate</button>

      <table>
        <tbody>
          {
            wordsearch.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    row.map((letter, index) => {
                      return <td key={index}>{letter}</td>;
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  options: state.options,
  wordsearch: state.wordsearch.wordsearch
});
const mapDispatchToProps = {
  changeWord,
  generate
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
