import React, {useState, useEffect} from 'react';
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
import {Image, ImageStyle, View, Dimensions} from 'react-native';
import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';

import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

import {
  updatePlayerVisibility,
} from './../redux/actions';

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

const App = (props: any): React.ReactElement => {
  const {currentTheme, currentLang,  bookChapter} = props;
  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;
  const [theme, setTheme] = React.useState(currentTheme);

  const [bookId, setBookId] = useState(0);

  useEffect(() => {
    (async () => {
      props.setPlayerVisibility(false);
      // console.log('APP.COMPONENT.TSX');
    })();
  }, [bookId]);
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
      <Image
        style={{width: 20, height: 20, marginHorizontal: 10}}
        source={pauseImage}
      />
    );
  };

  const PlayIcon = (style): ImageStyle => {
    const playImage = require('./../assets/images/play.png');
    return (
      <Image
        style={{width: 20, height: 20, marginHorizontal: 10}}
        source={playImage}
      />
    );
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
              {bookChapter.playerVisibility && (
              <View style={styles.cardContainer}>
                {/* <Image style={styles.imageCard} source={require('./../assets/images/play.png')} /> */}
                <View style={styles.labelContainer}>
                  <Text appearance="hint" category="s1">Title here</Text>
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
              )}
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
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
  },
});

const Splash = ({loading}): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

const AppComponent = (props: any): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {appProps => <App {...appProps} {...props} />}
  </AppLoading>
);

const mapStateToProps = state => {
  return {
    bookChapter: state.bookChapter,
    bookDetail: state.bookDetail,
    books: state.books.data,
    intlData: state.intlData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlayerVisibility: playerVisibility =>
      dispatch(updatePlayerVisibility(playerVisibility)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
