import React from 'react';
import { connect } from 'react-redux';
import { capitalize } from '@reverse/string';
import ReactGA from 'react-ga';
import domToImage from 'dom-to-image';
import { saveAs } from 'file-saver';

import { Store } from '../store';
import { changeWord, changeWidth, changeHeight, generate } from '../actions';
import { WordSearchOptions } from '../reducers/word-search-options';
import { WordSearchGenerationOptions } from '../reducers/word-search-state';

import '../styles/index.css';

function App(
  { options, wordsearch, changeWord, changeWidth, changeHeight, generate }:
  {
    options: WordSearchOptions,
    wordsearch: { wordsearch: string[][], word: string },
    changeWord: (word: string) => void,
    changeWidth: (width: number) => void,
    changeHeight: (height: number) => void,
    generate: (options: WordSearchGenerationOptions) => void
  }
) {
  function handleWordChange(event: any) {
    changeWord(event.target.value);
  }
  function handleWidthChange(event: any) {
    changeWidth(event.target.value);
  }
  function handleHeightChange(event: any) {
    changeHeight(event.target.value);
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
  function handleExport() {
    const domNode = document.getElementById('wordsearch');

    if(domNode) {
      domToImage.toBlob(domNode as Node, {
        // width: domNode.clientWidth,
        height: domNode.clientHeight,
        bgcolor: '#ffffff'
      }).then((blob) => {
        saveAs(blob, `${options.word.toLowerCase()}.png`)
      });
    }
  }

  return (
    <div>
      <div>
        <span>Word: <input type='text' value={options.word} onChange={handleWordChange} /></span>
      </div>
      <div>
        <span>Width: <input type='number' value={options.size.width} onChange={handleWidthChange} /></span>
      </div>
      <div>
        <span>Height: <input type='number' value={options.size.height} onChange={handleHeightChange} /></span>
      </div>
      <button onClick={handleGenerate} style={{ marginTop: '5px' }}>Generate</button>
      <button onClick={handleExport} style={{ marginTop: '5px' }}>Export as Image</button>

      <div id='wordsearch-wrapper-wrapper'>
        <div id='wordsearch-wrapper'>
          <div id='wordsearch'>
            {
              wordsearch.wordsearch.length === 0
                ? null
                : <p>{capitalize(wordsearch.word.toLowerCase())} word search.</p>
            }
            <table>
              <tbody>
                {
                  wordsearch.wordsearch.map((row, index) => {
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
    
            {
              wordsearch.word
                ? <div id="wordsearch-word">
                    <p style={{ marginBottom: '-12px' }}>Words to find:</p>
                    <p>{wordsearch.word}</p>
                  </div>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => ({
  options: state.options,
  wordsearch: state.wordsearch
});
const mapDispatchToProps = {
  changeWord,
  changeWidth,
  changeHeight,
  generate
};

ReactGA.initialize('UA-134185568-6');
ReactGA.pageview('/');

export default connect(mapStateToProps, mapDispatchToProps)(App);
