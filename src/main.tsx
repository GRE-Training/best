import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { GOOGLE_CLIENT_ID, GOOGLE_CONFIGURED } from './services/auth';
import './index.css';

// Vite sets BASE_URL to '/' in dev and '/best/' in the Pages build.
// React Router needs it without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const app = (
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {GOOGLE_CONFIGURED ? (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{app}</GoogleOAuthProvider>
    ) : (
      app
    )}
  </React.StrictMode>,
);
