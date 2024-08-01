// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import Store from './app/Store.js';
import { Toaster } from 'react-hot-toast';
import i18n from './i18n';  // Ensure this import path is correct
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Toaster position='top-center' reverseOrder={false} />
        <App />
    </Provider>
  </React.StrictMode>
);
