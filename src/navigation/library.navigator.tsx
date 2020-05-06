import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { LibraryTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { LibraryScreen } from '../scenes/library';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';

type LibraryNavigatorParams = {
  [AppRoute.LIBRARY]: undefined;
}

export interface LibraryScreenProps {
  navigation: CompositeNavigationProp<
    LibraryTabNavigationProp,
    StackNavigationProp<LibraryNavigatorParams, AppRoute.LIBRARY>>;
  route: RouteProp<LibraryNavigatorParams, AppRoute.LIBRARY>;
}

const Stack = createStackNavigator<LibraryNavigatorParams>();

export const LibraryNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.LIBRARY} component={LibraryScreen}/>
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
