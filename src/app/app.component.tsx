import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { dark, mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../navigation/app.navigator';
import { AppRoute } from '../navigation/app-routes';
import { default as appTheming } from './app-theming.json';
import { default as appMapping } from './app-mapping.json';

export default (): React.ReactFragment => {

  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider
        mapping={mapping}
        customMapping={appMapping}
        theme={{...dark, ...appTheming}}>
        <SafeAreaProvider>
          <NavigationContainer>
            {/* <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}/> */}
            <AppNavigator initialRouteName={AppRoute.HOME}/>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
};
