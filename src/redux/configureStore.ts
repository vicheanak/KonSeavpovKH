import { createStore, applyMiddleware } from 'redux';
import app from '../reducers';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

export default function configureStore() {
  let store = createStore(app, applyMiddleware(thunk));
  // let store = createStore(app, applyMiddleware(axiosMiddleware(client)));
  return store;
}