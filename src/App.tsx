import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './config/ReactotronConfig';
import GlobalStyle from './styles/global';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <h1>App</h1>
    </BrowserRouter>
  );
};

export default App;
