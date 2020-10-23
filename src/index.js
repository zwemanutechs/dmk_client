import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose  } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import './index.css';
import App from './App';
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import apiMiddleware  from './middleware/custom-apiMiddleware';
import {client} from "./middleware/axios-middleware";
import {BrowserRouter} from "react-router-dom";
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, apiMiddleware),
);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter history={history}>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
