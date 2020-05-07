import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { TodoTabNavigationProp } from './menu.navigator';
import { AppRoute } from './app-routes';
import {
  TodoDetailsRouteParams,
  TodoDetailsScreen,
  ReadingScreen,
  BookScreen,
  TodoTabBar,
} from '../scenes/todo';
import { DoneAllIcon, GridIcon } from '../assets/icons';
import TodoTabsNavigator from './todo.tabs.navigator';
import HighlightNavigator from './highlight.navigator';

type TodoNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
}

type TodoTabsNavigatorParams = {
  [AppRoute.BOOK]: undefined;
  [AppRoute.READING]: undefined;
}

export type TodoScreenProps = MaterialTopTabBarProps & {
  navigation: TodoTabNavigationProp;
}

export interface BookScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp & StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.BOOK>>;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.BOOK>;
}

export interface ReadingScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp & StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.READING>>;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.READING>;
}

export interface TodoDetailsScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
  route: RouteProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
}

const Stack = createStackNavigator<TodoNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<TodoTabsNavigatorParams>();

export const TodoNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.TODO} component={TodoTabsNavigator}/>
    <Stack.Screen name={AppRoute.TODO_DETAILS} component={TodoDetailsScreen}/>
    <Stack.Screen name={AppRoute.HIGHLIGHT} component={HighlightNavigator}/>
  </Stack.Navigator>
);
