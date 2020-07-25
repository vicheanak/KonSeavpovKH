import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import { navigationRef } from './../app/RootNavigation';

import {
  ProfileScreen
} from '../scenes/menu';

type ReadingNavigatorParams = AppNavigatorParams & {
  [AppRoute.PROFILE]: undefined;
}

const Stack = createStackNavigator<ReadingNavigatorParams>();

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' forwardRef={navigationRef}>
    <Stack.Screen name={AppRoute.PROFILE} ref={navigationRef} component={ProfileScreen}/>
  </Stack.Navigator>
);
