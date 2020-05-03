import React from 'react';
import {AppRoute} from './app-routes';
import {
  TodoDetailsRouteParams,
  TodoDetailsScreen,
  TodoDoneScreen,
  TodoInProgressScreen,
  TodoTabBar,
} from '../scenes/todo';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {TodoTabNavigationProp} from './home.navigator';
import {connect} from 'react-redux';
import {DoneAllIcon, GridIcon} from '../assets/icons';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';

type TodoNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
  [AppRoute.HIGHLIGHT]: undefined;
};

type TodoTabsNavigatorParams = {
  [AppRoute.TODO_IN_PROGRESS]: undefined;
  [AppRoute.TODO_DONE]: undefined;
  [AppRoute.HIGHLIGHT]: undefined;
};

export interface TodoInProgressScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp &
      StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<
      TodoTabsNavigatorParams,
      AppRoute.TODO_IN_PROGRESS
    >
  >;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.TODO_IN_PROGRESS>;
}





export interface TodoDoneScreenProps {
  navigation: CompositeNavigationProp<
    TodoTabNavigationProp &
      StackNavigationProp<TodoNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<TodoTabsNavigatorParams, AppRoute.TODO_DONE>
  >;
  route: RouteProp<TodoTabsNavigatorParams, AppRoute.TODO_DONE>;
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
              name={AppRoute.TODO_IN_PROGRESS}
              component={TodoInProgressScreen}
              options={{title: props.intlData.messages['BOOKS'], tabBarIcon: GridIcon}}
          />
          <TopTab.Screen
              name={AppRoute.TODO_DONE}
              component={TodoDoneScreen}
              options={{title: props.intlData.messages['READS'], tabBarIcon: DoneAllIcon}}
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
