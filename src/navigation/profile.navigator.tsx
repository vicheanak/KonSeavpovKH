import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ProfileTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { LibraryScreen } from '../scenes/library';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';

type ProfileNavigatorParams = {
  [AppRoute.PROFILE]: undefined;
}

export interface LibraryScreenProps {
  navigation: CompositeNavigationProp<
    ProfileTabNavigationProp,
    StackNavigationProp<ProfileNavigatorParams, AppRoute.PROFILE>>;
  route: RouteProp<ProfileNavigatorParams, AppRoute.PROFILE>;
}

const Stack = createStackNavigator<ProfileNavigatorParams>();

export const ProfileNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.PROFILE} component={LibraryScreen}/>
  </Stack.Navigator>
);


const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNavigator)
