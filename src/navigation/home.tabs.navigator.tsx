import React from 'react';
import {AppRoute} from './app-routes';
import {
  TodoDetailsRouteParams,
  TodoDetailsScreen,
  ReadingScreen,
  BookScreen,
  HomeTabBar,
} from '../scenes/home';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {HomeTabNavigationProp} from './menu.navigator';
import {connect} from 'react-redux';
import {BookIcon, DoneAllIcon, GridIcon, EyeIcon, BookOpenIcon, BookmarkIcon} from '../assets/icons';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';

type HomeNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.TODO_DETAILS]: TodoDetailsRouteParams;
};

type HomeTabsNavigatorParams = {
  [AppRoute.BOOK]: undefined;
  [AppRoute.READING]: undefined;
};

export interface BookScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp &
      StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<
      HomeTabsNavigatorParams,
      AppRoute.BOOK
    >
  >;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.BOOK>;
}


export interface ReadingScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp &
      StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.READING>
  >;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.READING>;
}

export interface TodoDetailsScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>;
  route: RouteProp<HomeNavigatorParams, AppRoute.TODO_DETAILS>;
}

export type HomeScreenProps = MaterialTopTabBarProps & {
  navigation: HomeTabNavigationProp;
};

const Stack = createStackNavigator<HomeNavigatorParams>();
const TopTab = createMaterialTopTabNavigator<HomeTabsNavigatorParams>();

const HomeTabsNavigator = (props: any): React.ReactElement => {
    return (
        // @ts-ignore: `tabBar` also contains a DrawerNavigationProp & BottomTabNavigationProp
        <TopTab.Navigator
        swipeEnabled={false}
        tabBar={props => <HomeTabBar {...props} />}>
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
)(HomeTabsNavigator);
