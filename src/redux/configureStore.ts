import { createStore, applyMiddleware, compose  } from 'redux';
import app from '../reducers';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});


export default function configureStore() {

  let store = createStore(app, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));
  // let store = createStore(app, applyMiddleware(axiosMiddleware(client)));
  return store;
}