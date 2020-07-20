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
  BookDetailRouteParams,
  BookDetailScreen,
  ReadingScreen,
  BookScreen,
  HomeTabBar,
  SavedScreen,
  BookReadingScreen,
  BookListeningScreen,
  BookChapterScreen
} from '../scenes/home';
import { DoneAllIcon, GridIcon } from '../assets/icons';
import HomeTabsNavigator from './home.tabs.navigator';
import HighlightNavigator from './highlight.navigator';

type HomeNavigatorParams = {
  [AppRoute.HOME]: undefined;
  // [AppRoute.BOOK_DETAIL]: BookDetailRouteParams;
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
    HomeTabNavigationProp & StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.BOOK>>;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.BOOK>;
}

export interface ReadingScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp & StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.READING>>;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.READING>;
}

// export interface BookDetailScreenProps {
//   navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
//   route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
// }

const Stack = createStackNavigator<HomeNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<HomeTabsNavigatorParams>();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={HomeTabsNavigator}/>
    {/* <Stack.Screen name={AppRoute.BOOK_DETAIL} component={BookDetailScreen}/> */}
    <Stack.Screen name={AppRoute.HIGHLIGHT} component={HighlightNavigator}/>
    <Stack.Screen name={AppRoute.SAVED} component={SavedScreen}/>
  </Stack.Navigator>
);
