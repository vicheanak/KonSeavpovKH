import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import { navigationRef } from './../app/RootNavigation';

import {
  ProfileScreen,
  TermsOfServicesScreen,
  PrivacyPolicyScreen
} from '../scenes/menu';

type ReadingNavigatorParams = AppNavigatorParams & {
  [AppRoute.PROFILE]: undefined;
  [AppRoute.TERMS_OF_SERVICES]: undefined;
  [AppRoute.PRIVACY_POLICY]: undefined;
}

const Stack = createStackNavigator<ReadingNavigatorParams>();

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' forwardRef={navigationRef}>
    <Stack.Screen name={AppRoute.PROFILE} ref={navigationRef} component={ProfileScreen}/>
    <Stack.Screen name={AppRoute.TERMS_OF_SERVICES} ref={navigationRef} component={TermsOfServicesScreen}/>
    <Stack.Screen name={AppRoute.PRIVACY_POLICY} ref={navigationRef} component={PrivacyPolicyScreen}/>
  </Stack.Navigator>
);
