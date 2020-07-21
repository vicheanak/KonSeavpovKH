
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import { navigationRef } from './../app/RootNavigation';

import {
  BookListeningScreen,
  BookChapterScreen
} from '../scenes/home';

type ListeningNavigatorParams = AppNavigatorParams & {
  [AppRoute.BOOK_LISTENING]: undefined;
  [AppRoute.BOOK_CHAPTER]: undefined;
}

export interface BookListeningScreenProps {
  navigation: StackNavigationProp<ListeningNavigatorParams, AppRoute.BOOK_LISTENING>;
  route: RouteProp<ListeningNavigatorParams, AppRoute.BOOK_LISTENING>;
}
const Stack = createStackNavigator<ListeningNavigatorParams>();

export const ListeningNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' forwardRef={navigationRef}>
    <Stack.Screen name={AppRoute.BOOK_LISTENING} component={BookListeningScreen}/>
    <Stack.Screen name={AppRoute.BOOK_CHAPTER} component={BookChapterScreen}/>
  </Stack.Navigator>
);
