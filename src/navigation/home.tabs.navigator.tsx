import React from 'react';
import {AppRoute} from './app-routes';
import {
  BookDetailRouteParams,
  BookDetailScreen,
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
  [AppRoute.BOOK_DETAIL]: BookDetailRouteParams;
};

type HomeTabsNavigatorParams = {
  [AppRoute.BOOK]: undefined;
  [AppRoute.READING]: undefined;
};

export interface BookScreenProps {
  navigation: CompositeNavigationProp<
    HomeTabNavigationProp &
      StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>,
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
      StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>,
    MaterialTopTabNavigationProp<HomeTabsNavigatorParams, AppRoute.READING>
  >;
  route: RouteProp<HomeTabsNavigatorParams, AppRoute.READING>;
}

export interface BookDetailScreenProps {
  navigation: StackNavigationProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
  route: RouteProp<HomeNavigatorParams, AppRoute.BOOK_DETAIL>;
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
              options={{title: props.intlData.messages['saved'], tabBarIcon: BookmarkIcon}}
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
