import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { LibraryTabNavigationProp } from './menu.navigator';
import { AppRoute } from './app-routes';
import { LibraryScreen, LibraryDetailScreen } from '../scenes/library';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';

type LibraryNavigatorParams = {
  [AppRoute.LIBRARY]: undefined;
  [AppRoute.LIBRARY_DETAIL]: any;
}

export interface LibraryScreenProps {
  navigation: CompositeNavigationProp<
    LibraryTabNavigationProp,
    StackNavigationProp<LibraryNavigatorParams, AppRoute.LIBRARY>>;
  route: RouteProp<LibraryNavigatorParams, AppRoute.LIBRARY>;
}

export interface LibraryDetailScreenProps {
  navigation: CompositeNavigationProp<
    LibraryTabNavigationProp,
    StackNavigationProp<LibraryNavigatorParams, AppRoute.LIBRARY_DETAIL>>;
  route: RouteProp<LibraryNavigatorParams, AppRoute.LIBRARY_DETAIL>;
}

const Stack = createStackNavigator<LibraryNavigatorParams>();

export const LibraryNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.LIBRARY} component={LibraryScreen}/>
    <Stack.Screen name={AppRoute.LIBRARY_DETAIL} component={LibraryDetailScreen}/>
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
)(LibraryNavigator)
