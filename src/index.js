import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import './index.css';
import App from './App';
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker';

import rootReducer from "./reducers";
import { Router, Route } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = createStore(
    rootReducer,
    composeWithDevTools()
);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
          <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
