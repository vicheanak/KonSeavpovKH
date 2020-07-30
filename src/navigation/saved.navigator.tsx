import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { LibraryTabNavigationProp } from './menu.navigator';
import { AppRoute } from './app-routes';
import { LibraryScreen, LibraryDetailScreen } from '../scenes/library';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';
import { SavedScreen } from '../scenes/home';

type SavedNavigatorParams = {
  [AppRoute.SAVED]: undefined;
}

const Stack = createStackNavigator<SavedNavigatorParams>();

export const SavedNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.SAVED} component={SavedScreen}/>
  </Stack.Navigator>
);