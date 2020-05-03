import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ProfileTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { HighlightDetailScreen } from '../scenes/highlight';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';

type HighlightDetailNavigatorParams = {
  [AppRoute.HIGHLIGHT_DETAIL]: undefined;
}

export interface HighlightDetailScreenProps {
  navigation: StackNavigationProp<HighlightDetailNavigatorParams, AppRoute.HIGHLIGHT_DETAIL>;
  route: RouteProp<HighlightDetailNavigatorParams, AppRoute.HIGHLIGHT_DETAIL>;
}

const Stack = createStackNavigator<HighlightDetailNavigatorParams>();

const HighlightDetailNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HIGHLIGHT_DETAIL} component={HighlightDetailScreen}/>
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
)(HighlightDetailNavigator)
