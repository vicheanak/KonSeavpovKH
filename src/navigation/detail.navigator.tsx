
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import { navigationRef } from '../app/RootNavigation';

import {
  BookDetailScreen,
} from '../scenes/home';

type ReadingNavigatorParams = AppNavigatorParams & {
  [AppRoute.BOOK_DETAIL]: undefined;
}

const Stack = createStackNavigator<ReadingNavigatorParams>();

export const DetailNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' forwardRef={navigationRef}>
    <Stack.Screen name={AppRoute.BOOK_DETAIL} component={BookDetailScreen}/>
  </Stack.Navigator>
);
