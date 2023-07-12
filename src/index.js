import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
