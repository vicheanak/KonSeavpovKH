
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';

import {
  BookListeningScreen,
} from '../scenes/home';

type ListeningNavigatorParams = AppNavigatorParams & {
  [AppRoute.BOOK_LISTENING]: undefined;
}

export interface BookListeningScreenProps {
  navigation: StackNavigationProp<ListeningNavigatorParams, AppRoute.BOOK_LISTENING>;
  route: RouteProp<ListeningNavigatorParams, AppRoute.BOOK_LISTENING>;
}
const Stack = createStackNavigator<ListeningNavigatorParams>();

export const ListeningNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.BOOK_LISTENING} component={BookListeningScreen}/>
  </Stack.Navigator>
);
