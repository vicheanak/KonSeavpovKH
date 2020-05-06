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
import {TodoNavigator} from './todo.navigator';
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
   HomeDrawer, 
   HomeTabBar} from '../scenes/home';
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
import {intlData} from './../reducers/intlReducer';
import HomeBottomNavigator from './home.bottom.navigator';

type HomeDrawerNavigatorParams = {
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

type HomeBottomTabsNavigatorParams = {
  [AppRoute.TODO]: undefined;
  [AppRoute.LIBRARY]: undefined;
  [AppRoute.HIGHLIGHT]: undefined;
};

export type TodoTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.TODO>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export type LibraryTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.LIBRARY>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export type HighlightTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.HIGHLIGHT>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.UPGRADE_NOW>
>;

export interface UpdatePhonenumberScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.UPDATE_PHONENUMBER
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.UPDATE_PHONENUMBER>;
}

export interface MembershipScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.MEMBERSHIP
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.MEMBERSHIP>;
}

export interface UpgradeNowScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.UPGRADE_NOW
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.UPGRADE_NOW>;
}

export interface DownloadsScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.DOWNLOADS
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.DOWNLOADS>;
}

export interface TermsOfServicesScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.TERMS_OF_SERVICES
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.TERMS_OF_SERVICES>;
}

export interface PrivacyPolicyScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.PRIVACY_POLICY
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PRIVACY_POLICY>;
}

export interface TermsOfServicesScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.TERMS_OF_SERVICES
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.TERMS_OF_SERVICES>;
}

export interface FeedbackScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.FEEDBACK
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.FEEDBACK>;
}

export interface FollowUsFacebookScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.FOLLOW_US_FACEBOOK
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.FOLLOW_US_FACEBOOK>;
}

export interface AboutUsScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.ABOUT_US
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ABOUT_US>;
}

export interface ContactUsScreenProps {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.CONTACT_US
  >;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CONTACT_US>;
}

export type BottomHomeScreenProps = BottomTabBarProps & {
  navigation: TodoTabNavigationProp;
};

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<
    HomeDrawerNavigatorParams,
    AppRoute.UPGRADE_NOW
  >;
};

const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>();
const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>();

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

const HomeNavigator = (props: any): React.ReactElement => {
  return (
    // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
    <Drawer.Navigator drawerContent={HomeDrawer}>
      <Drawer.Screen
        name={AppRoute.HOME}
        component={HomeBottomNavigator}
        // component={UpdatePhonenumberScreen}
        options={{
          title: props.intlData.messages['HOME'],
          drawerIcon: HomeOrangeIcon,
        }}
      />
      <Drawer.Screen
        name={AppRoute.UPDATE_PHONENUMBER}
        // component={HomeBottomNavigator}
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
)(HomeNavigator);
