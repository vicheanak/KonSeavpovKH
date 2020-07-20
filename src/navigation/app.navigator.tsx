import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthNavigator} from './auth.navigator';
import MenuNavigator from './menu.navigator';
import {AppRoute} from './app-routes';
import {ReadingNavigator} from './reading.navigator';
import {ListeningNavigator} from './listening.navigator';
import {DetailNavigator} from './detail.navigator';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.BOOK_READING]: undefined;
  [AppRoute.BOOK_LISTENING]: undefined;
  [AppRoute.BOOK_DETAIL]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (
  props: Partial<StackNavigatorProps>,
): React.ReactElement => (
  <Stack.Navigator {...props} headerMode="none">
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    <Stack.Screen name={AppRoute.HOME} component={MenuNavigator} />
    <Stack.Screen name={AppRoute.BOOK_READING} component={ReadingNavigator} />
    <Stack.Screen name={AppRoute.BOOK_LISTENING} component={ListeningNavigator} />
    <Stack.Screen name={AppRoute.BOOK_DETAIL} component={DetailNavigator} />
  </Stack.Navigator>
);
