declare module 'wordsearch' {
  interface WordSearchOptions {
    color?: string;
    backwards?: number;
    letters?: string;
  }
  interface WordSearchResult {
    grid: string[][];
    solved: string[][];
    unplaced: string[];
  }

  /**
   * wordsearch
   *
   * generate a wordsearch puzzle
   */
  export default function wordsearch(words: string[], width: number, height: number, opts?: WordSearchOptions): WordSearchResult;
}
