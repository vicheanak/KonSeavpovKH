import React, {useEffect} from 'react';
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
import {AppIconsPack} from './app-icons-pack';
import {i18n, switchLanguage} from './i18n';
import {connect} from 'react-redux';
import {fetchData} from '../redux/actions';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {
  ButtonGroup,
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
  IconElement,
  Divider,
} from '@ui-kitten/components';

import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

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

const App = ({currentTheme, currentLang}): React.ReactElement => {
  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;
  const [theme, setTheme] = React.useState(currentTheme);

  switchLanguage(currentLang);

  const setCurrentTheme = (theme: any) => {
    const nextTheme = theme;
    AppStorage.setTheme(nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    AppStorage.setTheme(nextTheme);
    setTheme(nextTheme);
  };

  const [count, setCount] = React.useState(0);

  const styles = useStyleSheet(themedStyles);

  const playbackState = usePlaybackState();
  const [playPauseIcon, setPlayPauseIcon] = React.useState<any>('pause');

  const PlayPauseIcon = (style): ImageStyle => (
    <Icon {...style} pack="app" name={playPauseIcon} />
  );

  const onTogglePlayback = async () => {
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      setPlayPauseIcon('pause');
      await TrackPlayer.play();
    } else {
      setPlayPauseIcon('play');
      await TrackPlayer.pause();
    }
  };

  const PauseIcon = (style): ImageStyle => {
    const pauseImage = require('./../assets/images/pause.png');
    return (
      <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={pauseImage} />
    )
  }

  const PlayIcon = (style): ImageStyle => {
    const playImage = require('./../assets/images/play.png');
    return (
      <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={playImage} />
    )
  };

  let playPauseButton = PlayIcon;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    playPauseButton = PauseIcon;
  }

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
      <ThemeContext.Provider
        value={{...appTheming, theme, setCurrentTheme, toggleTheme}}>
        <ApplicationProvider
          mapping={mapping}
          customMapping={appMapping}
          {...eva}
          theme={{...eva[theme], ...appTheming}}>
          <SafeAreaProvider>
            <NavigationContainer>
              {/* <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}/> */}
              <AppNavigator initialRouteName={AppRoute.HOME} />
              <View style={styles.cardContainer}>
                {/* <Image style={styles.imageCard} source={require('./../assets/images/play.png')} /> */}
                <View style={styles.labelContainer}>
                  <Text category="s1">Title here</Text>
                  <Text appearance="hint" category="c1">
                    Artist name
                  </Text>
                </View>
                <View style={styles.mediaController}>
                  <Button
                    style={[styles.iconButton]}
                    appearance="ghost"
                    status="primary"
                    icon={playPauseButton}
                    onPress={onTogglePlayback}
                  />
                </View>
              </View>
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    flex: 1,
  },
  scrollViewContainer: {
    backgroundColor: 'background-basic-color-2',
    marginBottom: 80,
  },
  labelContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
    width: Dimensions.get('window').width - 10,
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 0,
    // justifyContent: 'flex-end',
    width: 50,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#242424',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 1.49,
    // elevation: 12,
  },
  itemHeader: {
    height: 140,
  },
  authorName: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238,176,0,.4)',
    padding: 3,
    paddingLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  productItem: {
    position: 'absolute',
    bottom: 1,
    margin: 5,
    width: Dimensions.get('window').width - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginTop: 10,
  },
  productTitle: {
    marginHorizontal: -15,
    marginVertical: -10,
    fontWeight: 'bold',
    lineHeight: 20,
    height: 55,
    width: Dimensions.get('window').width / 2 - 80,
  },
  image: {
    height: 360,
  },
  imageCard: {
    width: 70,
    height: 70,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  whoText: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  bookButton: {
    width: 150,
  },
  headerContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 8,
    position: 'absolute',
    top: Dimensions.get('window').height / 5,
  },
  buttonContainer: {
    width: 300,
    borderRadius: 30,
    justifyContent: 'center',
    marginLeft: 15,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
    lineHeight: 25,
  },
  sectionLabel: {
    marginHorizontal: 30,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});

const Splash = ({loading}): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => <App {...props} />}
  </AppLoading>
);
