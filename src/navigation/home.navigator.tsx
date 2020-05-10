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
  BookReadingRouteParams,
  BookListeningRouteParams,
  BookChapterRouteParams,
  BookChapterScreen
} from '../scenes/home';
import { DoneAllIcon, GridIcon } from '../assets/icons';
import HomeTabsNavigator from './home.tabs.navigator';
import HighlightNavigator from './highlight.navigator';

type HomeNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.BOOK_DETAIL]: BookDetailRouteParams;
  [AppRoute.BOOK_READING]: BookReadingRouteParams;
  [AppRoute.BOOK_LISTENING]: BookListeningRouteParams;
  [AppRoute.BOOK_CHAPTER]: BookChapterRouteParams;
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

export interface BookDetailScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
  route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
}

export interface BookReadingScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_READING>;
  route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_READING>;
}

export interface BookListeningScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_LISTENING>;
  route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_LISTENING>;
}

export interface BookChapterScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_CHAPTER>;
  route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_CHAPTER>;
}

const Stack = createStackNavigator<HomeNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<HomeTabsNavigatorParams>();

export const HomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={HomeTabsNavigator}/>
    <Stack.Screen name={AppRoute.BOOK_DETAIL} component={BookDetailScreen}/>
    <Stack.Screen name={AppRoute.HIGHLIGHT} component={HighlightNavigator}/>
    <Stack.Screen name={AppRoute.SAVED} component={SavedScreen}/>
    <Stack.Screen name={AppRoute.BOOK_READING} component={BookReadingScreen}/>
    <Stack.Screen name={AppRoute.BOOK_LISTENING} component={BookListeningScreen}/>
    <Stack.Screen name={AppRoute.BOOK_CHAPTER} component={BookChapterScreen}/>
  </Stack.Navigator>
);
