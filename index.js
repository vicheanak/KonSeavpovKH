/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/app/app.component';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
// import TrackPlayer from 'react-native-track-player';
import serviceFactory from './src/services/track-player.service';
// import TrackPlayer from './libs/index.js';

console.disableYellowBox = true;
const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);

module.exports = require('./libs/index.js');
// export {trackerPlayerLib};
// AppRegistry.registerHeadlessTask('TrackPlayer', ServiceFactory);
// AppRegistry.registerComponent(appName, () => App);
