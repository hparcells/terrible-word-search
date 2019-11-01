import React from 'react';
import wordsearch from 'wordsearch';

function App() {
  return (
    <div>
      <p>{JSON.stringify(wordsearch(['dave'], 4, 4, { letters: 'dave' }).grid)}</p>
    </div>
  );
}

export default App;
