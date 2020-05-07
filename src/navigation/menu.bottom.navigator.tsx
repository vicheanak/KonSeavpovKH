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
import { HomeNavigator } from './home.navigator';
import { LibraryNavigator } from './library.navigator';
import { AppRoute } from './app-routes';
import { MenuDrawer, MenuTabBar } from '../scenes/menu';
import { HomeIcon, InfoIcon, LayoutIcon, PersonIcon, BookOpenIcon, BookIcon, SearchIcon } from '../assets/icons';
import { connect } from 'react-redux';
import { intlData } from '../reducers/intlReducer';


type MenuBottomTabsNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.LIBRARY]: undefined;
}

const BottomTab = createBottomTabNavigator<MenuBottomTabsNavigatorParams>();

const HomeBottomNavigator = (props:any): React.ReactElement => {
  return (
    // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
    <BottomTab.Navigator tabBar={MenuTabBar}>
      <BottomTab.Screen
        name={AppRoute.HOME}
        component={HomeNavigator}
        options={{ title: props.intlData.messages['HOME'], tabBarIcon: HomeIcon }}
      />
      <BottomTab.Screen
        name={AppRoute.LIBRARY}
        component={LibraryNavigator}
        options={{ title: props.intlData.messages['LIBRARY'], tabBarIcon: BookOpenIcon }}
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
