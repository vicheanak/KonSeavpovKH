import { AsyncStorage, YellowBox } from 'react-native';
import { Theme, Local } from './theme.service';

const THEME_KEY: string = 'theme';
const LOCAL_KEY: string = 'local';

export class AppStorage {


  static getTheme = (fallback?: Theme): Promise<Theme> => {
    return AsyncStorage.getItem(THEME_KEY).then((theme: any) => {
      return theme || fallback;
    });
  };

  static setTheme = (theme: Theme): Promise<void> => {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };

  static getLocal = (fallback?: Local): Promise<Local> => {
    return AsyncStorage.getItem(LOCAL_KEY).then((theme: any) => {
      return theme || fallback;
    });
  };

  static setLocal = (local: Local): Promise<void> => {
    return AsyncStorage.setItem(LOCAL_KEY, local);
  };
  
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
