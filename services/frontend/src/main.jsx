import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import SavedJobCountProvider from './contexts/SavedJobCountContext';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SavedJobCountProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SavedJobCountProvider>
    </AuthProvider>
  </React.StrictMode>
);
