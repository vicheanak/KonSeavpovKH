import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { TodoNavigator } from './todo.navigator';
import { ProfileNavigator } from './profile.navigator';
import { AppRoute } from './app-routes';
import { AboutScreen, HomeDrawer, HomeTabBar } from '../scenes/home';
import { HomeIcon, InfoIcon, LayoutIcon, PersonIcon, BookOpenIcon, BookIcon, SearchIcon } from '../assets/icons';
import { connect } from 'react-redux';
import { intlData } from './../reducers/intlReducer';


type HomeBottomTabsNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.PROFILE]: undefined;
}

const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>();

const HomeBottomNavigator = (props:any): React.ReactElement => {
  return (
    // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
    <BottomTab.Navigator tabBar={HomeTabBar}>
      <BottomTab.Screen
        name={AppRoute.TODO}
        component={TodoNavigator}
        options={{ title: props.intlData.messages['HOME'], tabBarIcon: HomeIcon }}
      />
      <BottomTab.Screen
        name={AppRoute.PROFILE}
        component={ProfileNavigator}
        options={{ title: props.intlData.messages['LIBRARY'], tabBarIcon: SearchIcon }}
      />
    </BottomTab.Navigator>
  )
};

const mapStateToProps = (state) => {
  return {
    intlData: state.intlData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBottomNavigator)
