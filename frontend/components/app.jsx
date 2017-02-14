import React from 'react';
import MainSplash from './mainsplash';

const App = ({children}) => (
  <div className="app">
    <MainSplash />
    {children}
  </div>
);

export default App;
