import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { HomeTabNavigationProp } from './menu.navigator';
import { AppRoute } from './app-routes';
import {
  TodoDetailsRouteParams,
  TodoDetailsScreen,
  ReadingScreen,
  BookScreen,
  HomeTabBar,
  SavedScreen
} from '../scenes/home';
import { DoneAllIcon, GridIcon } from '../assets/icons';
import HomeTabsNavigator from './home.tabs.navigator';
import HighlightNavigator from './highlight.navigator';

type HomeNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
}

type HomeTabsNavigatorParams = {
  [AppRoute.BOOK]: undefined;
  [AppRoute.READING]: undefined;
}

export type HomeScreenProps = MaterialTopTabBarProps & {
  navigation: HomeTabNavigationProp;
}

export interface BookScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp & StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.BOOK>>;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.BOOK>;
}

export interface ReadingScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp & StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.READING>>;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.READING>;
}

export interface TodoDetailsScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>;
  route: RouteProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>;
}

const Stack = createStackNavigator<HomeNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<HomeTabsNavigatorParams>();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={HomeTabsNavigator}/>
    <Stack.Screen name={AppRoute.TODO_DETAILS} component={TodoDetailsScreen}/>
    <Stack.Screen name={AppRoute.HIGHLIGHT} component={HighlightNavigator}/>
    <Stack.Screen name={AppRoute.SAVED} component={SavedScreen}/>
  </Stack.Navigator>
);
