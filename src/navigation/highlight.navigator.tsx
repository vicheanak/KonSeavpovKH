import React from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { ProfileTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { HighlightScreen, HighlightDetailScreen, HighlightDetailRouteParams } from '../scenes/highlight';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';


type HighlightNavigatorParams = {
  [AppRoute.HIGHLIGHT]: undefined;
  [AppRoute.HIGHLIGHT_DETAIL]: any;
}


// export interface HighlightScreenProps {
//   navigation: CompositeNavigationProp<
//     ProfileTabNavigationProp,
//     StackNavigationProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT>>;
//   route: RouteProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT>;
// }


export interface HighlightScreenProps {
  navigation: StackNavigationProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT>;
  route: RouteProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT>;
}


export interface HighlightDetailScreenProps {
  navigation: StackNavigationProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT_DETAIL>;
  route: RouteProp<HighlightNavigatorParams, AppRoute.HIGHLIGHT_DETAIL>;
}


const Stack = createStackNavigator<HighlightNavigatorParams>();

const HighlightNavigator = (props): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HIGHLIGHT} component={HighlightScreen}/>
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
)(HighlightNavigator)
