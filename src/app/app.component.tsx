import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {dark, mapping} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from '../navigation/app.navigator';
import {AppRoute} from '../navigation/app-routes';
import {default as appTheming} from './app-theming.json';
import {default as appMapping} from './app-mapping.json';
import {ThemeContext, Local, Theme} from '../services/theme.service';
import * as eva from '@eva-design/eva';
import {AppStorage} from '../services/app-storage.service';
import {AppLoading, LoadFontsTask, Task} from './app-loading.component';
import {SplashImage} from '../components/splash-image.component';
import { AppIconsPack } from './app-icons-pack';
import { i18n, switchLanguage  } from './i18n';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions';

const defaultConfig: {local: Local; theme: Theme} = {
  local: 'kh',
  theme: 'light',
};

const loadingTasks: Task[] = [
  () =>
    AppStorage.getTheme(defaultConfig.theme).then(result => [
      'currentTheme',
      result,
    ]),
  () =>
    AppStorage.getLocal(defaultConfig.local).then(result => [
      'currentLang',
      result,
    ]),
];

const App = ({ currentTheme, currentLang }): React.ReactElement => {
  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;
  const [theme, setTheme] = React.useState(currentTheme);

  switchLanguage(currentLang);

  const setCurrentTheme = (theme: any) => {
    const nextTheme = theme;
    AppStorage.setTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
      <ThemeContext.Provider value={{...appTheming, theme, setCurrentTheme}}>
        <ApplicationProvider
          mapping={mapping}
          customMapping={appMapping}
          {...eva}
          theme={eva[theme]}>
          <SafeAreaProvider>
            <NavigationContainer>
              {/* <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}/> */}
              <AppNavigator initialRouteName={AppRoute.HOME} />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};


// const App = (): React.ReactElement => {
const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

const appLoading = (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => <App {...props} />}
  </AppLoading>
)

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
)(appLoading)

  
// export default (): React.ReactElement => (
//   <AppLoading
//     tasks={loadingTasks}
//     initialConfig={defaultConfig}
//     placeholder={Splash}>
//     {props => <App {...props} />}
//   </AppLoading>
// )
