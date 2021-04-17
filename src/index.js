import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';


window.$ = $;
window.Popper = Popper;

const firebaseConfig = {
    apiKey: "AIzaSyBi_d7ZMVcMhduw4sNgkCZIeDnpx05NEpY",
    authDomain: "todoapp-345b4.firebaseapp.com",
    projectId: "todoapp-345b4",
    storageBucket: "todoapp-345b4.appspot.com",
    messagingSenderId: "81083597287",
    appId: "1:81083597287:web:d4973a74fae178dcc9bd42",
    measurementId: "G-0PBJXZGYQD"
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
