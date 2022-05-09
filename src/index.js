import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers/allReducers';

const store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


