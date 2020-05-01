/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/app/app.component';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);

// AppRegistry.registerComponent(appName, () => App);
