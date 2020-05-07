import React from 'react';
import {AppRoute} from './app-routes';
import {
  TodoDetailsRouteParams,
  TodoDetailsScreen,
  ReadingScreen,
  BookScreen,
  TodoTabBar,
} from '../scenes/todo';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {TodoTabNavigationProp} from './menu.navigator';
import {connect} from 'react-redux';
import {BookIcon, DoneAllIcon, GridIcon, EyeIcon, BookOpenIcon, BookmarkIcon} from '../assets/icons';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';

type TodoNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
};

type TodoTabsNavigatorParams = {
  [AppRoute.BOOK]: undefined;
  [AppRoute.READING]: undefined;
};

export interface BookScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp &
      StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<
      TodoTabsNavigatorParams,
      AppRoute.BOOK
    >
  >;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.BOOK>;
}


export interface ReadingScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp &
      StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.READING>
  >;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.READING>;
}

export interface TodoDetailsScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
  route: RouteProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>;
}

export type TodoScreenProps = MaterialTopTabBarProps & {
  navigation: TodoTabNavigationProp;
};

const Stack = createStackNavigator<TodoNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<TodoTabsNavigatorParams>();

const TodoTabsNavigator = (props: any): React.ReactElement => {
    return (
        // @ts-ignore: `tabBar` also contains a DrawerNavigationProp & BottomTabNavigationProp
        <TopTab.Navigator
        swipeEnabled={false}
        tabBar={props => <TodoTabBar {...props} />}>
          <TopTab.Screen
              name={AppRoute.BOOK}
              component={BookScreen}
              options={{title: props.intlData.messages['BOOKS'], tabBarIcon: BookIcon}}
          />
          <TopTab.Screen
              name={AppRoute.READING}
              component={ReadingScreen}
              options={{title: props.intlData.messages['READS'], tabBarIcon: BookmarkIcon}}
          />
        </TopTab.Navigator>
    );
};

const mapStateToProps = state => {
  return {
    intlData: state.intlData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoTabsNavigator);
