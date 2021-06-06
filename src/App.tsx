import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';
import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
