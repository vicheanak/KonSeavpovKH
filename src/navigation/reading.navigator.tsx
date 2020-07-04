
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import { navigationRef } from './../app/RootNavigation';

import {
  BookReadingScreen,
  BookChapterScreen
} from '../scenes/home';

type ReadingNavigatorParams = AppNavigatorParams & {
  [AppRoute.BOOK_READING]: undefined;
  [AppRoute.BOOK_CHAPTER]: undefined;
}

const Stack = createStackNavigator<ReadingNavigatorParams>();

export const ReadingNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' forwardRef={navigationRef}>
    <Stack.Screen name={AppRoute.BOOK_READING} ref={navigationRef} component={BookReadingScreen}/>
    <Stack.Screen name={AppRoute.BOOK_CHAPTER} component={BookChapterScreen}/>
  </Stack.Navigator>
);
