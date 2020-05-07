import React from 'react';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
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
import {HomeNavigator} from './home.navigator';
import {LibraryNavigator} from './library.navigator';
import {AppRoute} from './app-routes';
import {AboutUsScreen,
  ContactUsScreen,
  DownloadsScreen,
  FeedbackScreen,
  FollowUsFacebookScreen,
  MembershipScreen,
  PrivacyPolicyScreen,
  TermsOfServicesScreen,
  UpdatePhonenumberScreen,
  UpgradeNowScreen,
   MenuDrawer, 
   MenuTabBar} from '../scenes/menu';
import {
  HomeIcon,
  HomeOrangeIcon,
  InfoIcon,
  LayoutIcon,
  PersonIcon,
  UpdatePhonenumberIcon,
  MembershipIcon,
  UpgradeNowIcon,
  DownloadsIcon,
  TermsOfServicesIcon,
  PrivacyPolicyIcon,
  FeedbackIcon,
  FollowUsFacebookIcon,
  AboutUsIcon,
  ContactUsIcon,
} from '../assets/icons';
import {connect} from 'react-redux';
import {intlData} from '../reducers/intlReducer';
import MenuBottomNavigator from './menu.bottom.navigator';

type MenuDrawerNavigatorParams = {
  [AppRoute.UPDATE_PHONENUMBER]: undefined;
  [AppRoute.MEMBERSHIP]: undefined;
  [AppRoute.UPGRADE_NOW]: undefined;
  [AppRoute.DOWNLOADS]: undefined;
  [AppRoute.TERMS_OF_SERVICES]: undefined;
  [AppRoute.PRIVACY_POLICY]: undefined;
  [AppRoute.FEEDBACK]: undefined;
  [AppRoute.FOLLOW_US_FACEBOOK]: undefined;
  [AppRoute.ABOUT_US]: undefined;
  [AppRoute.CONTACT_US]: undefined;
};

type MenuBottomTabsNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.LIBRARY]: undefined;
  [AppRoute.HIGHLIGHT]: undefined;
};

export type HomeTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MenuBottomTabsNavigatorParams, AppRoute.HOME>,
  DrawerNavigationProp<MenuDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export type LibraryTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MenuBottomTabsNavigatorParams, AppRoute.LIBRARY>,
  DrawerNavigationProp<MenuDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export type HighlightTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MenuBottomTabsNavigatorParams, AppRoute.HIGHLIGHT>,
  DrawerNavigationProp<MenuDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export interface UpdatePhonenumberScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.UPDATE_PHONENUMBER
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.UPDATE_PHONENUMBER>;
}

export interface MembershipScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.MEMBERSHIP
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.MEMBERSHIP>;
}

export interface UpgradeNowScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.UPGRADE_NOW
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.UPGRADE_NOW>;
}

export interface DownloadsScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.DOWNLOADS
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.DOWNLOADS>;
}

export interface TermsOfServicesScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.TERMS_OF_SERVICES
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.TERMS_OF_SERVICES>;
}

export interface PrivacyPolicyScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.PRIVACY_POLICY
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.PRIVACY_POLICY>;
}

export interface TermsOfServicesScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.TERMS_OF_SERVICES
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.TERMS_OF_SERVICES>;
}

export interface FeedbackScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.FEEDBACK
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.FEEDBACK>;
}

export interface FollowUsFacebookScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.FOLLOW_US_FACEBOOK
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.FOLLOW_US_FACEBOOK>;
}

export interface AboutUsScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.ABOUT_US
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.ABOUT_US>;
}

export interface ContactUsScreenProps {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.CONTACT_US
  >;
  route: RouteProp<MenuDrawerNavigatorParams, AppRoute.CONTACT_US>;
}

export type MenuBottomScreenProps = BottomTabBarProps & {
  navigation: HomeTabNavigationProp;
};

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<
    MenuDrawerNavigatorParams,
    AppRoute.UPGRADE_NOW
  >;
};

const Drawer = createDrawerNavigator<MenuDrawerNavigatorParams>();
const BottomTab = createBottomTabNavigator<MenuBottomTabsNavigatorParams>();

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

const MenuNavigator = (props: any): React.ReactElement => {
  return (
    // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
    <Drawer.Navigator drawerContent={MenuDrawer}>
      <Drawer.Screen
        name={AppRoute.HOME}
        component={MenuBottomNavigator}
        // component={UpdatePhonenumberScreen}
        options={{
          title: props.intlData.messages['HOME'],
          drawerIcon: HomeOrangeIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.UPDATE_PHONENUMBER}
        component={UpdatePhonenumberScreen}
        options={{
          title: props.intlData.messages['update_phonenumber'],
          drawerIcon: UpdatePhonenumberIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.MEMBERSHIP}
        component={MembershipScreen}
        options={{
          title: props.intlData.messages['membership'],
          drawerIcon: MembershipIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.UPGRADE_NOW}
        component={UpgradeNowScreen}
        options={{
          title: props.intlData.messages['upgrade_now'],
          drawerIcon: UpgradeNowIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.DOWNLOADS}
        component={DownloadsScreen}
        options={{
          title: props.intlData.messages['downloads'],
          drawerIcon: DownloadsIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.TERMS_OF_SERVICES}
        component={TermsOfServicesScreen}
        options={{
          title: props.intlData.messages['terms_of_services'],
          drawerIcon: TermsOfServicesIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.PRIVACY_POLICY}
        component={PrivacyPolicyScreen}
        options={{
          title: props.intlData.messages['privacy_policy'],
          drawerIcon: PrivacyPolicyIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.FEEDBACK}
        component={FeedbackScreen}
        options={{
          title: props.intlData.messages['feedback'],
          drawerIcon: FeedbackIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.FOLLOW_US_FACEBOOK}
        component={FollowUsFacebookScreen}
        options={{
          title: props.intlData.messages['follow_us_facebook'],
          drawerIcon: FollowUsFacebookIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.ABOUT_US}
        component={AboutUsScreen}
        options={{
          title: props.intlData.messages['about_us'],
          drawerIcon: AboutUsIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.CONTACT_US}
        component={ContactUsScreen}
        options={{
          title: props.intlData.messages['contact_us'],
          drawerIcon: ContactUsIcon,
        }}
      />
    </Drawer.Navigator>
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
)(MenuNavigator);
