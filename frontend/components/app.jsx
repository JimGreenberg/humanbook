import React from 'react';
import Greeting from './greeting';

const App = ({children}) => (
  <div className="app">
    <h1>disgracebook</h1>
    <Greeting />
    {children}
  </div>
);

export default App;
