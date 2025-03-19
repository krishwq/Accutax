import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TaxState from './Context/Tax/TaxState';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaxState>
    <Auth0Provider
    domain="dev-eizaap2j2bpe28es.us.auth0.com"
    clientId="8o72LrMXlRbUjTR3x7LboIPmTHoOfgzn"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
    </Auth0Provider>
    </TaxState>
  </React.StrictMode>
);

