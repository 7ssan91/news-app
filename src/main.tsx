import React from 'react';
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import './colors.css';
import './index.css';
import LanguageRouter from './routing/LanguageRouter';
import { BrowserRouter } from 'react-router-dom';
// Store configuration
import { Provider } from 'react-redux';
import { store } from './store';
import i18n from '../i18nextConf';

// Assuming your root element has an id of 'root'
const rootElement = document.getElementById('root');

// Check if the root element exists before rendering
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LanguageRouter />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );


}
