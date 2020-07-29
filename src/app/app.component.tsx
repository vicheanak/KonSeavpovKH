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
import {
  Image,
  ImageStyle,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {CloseOutlineIcon} from '../assets/icons';
import TrackPlayer from 'react-native-track-player';
import {usePlaybackState} from 'react-native-track-player/lib/hooks';
import {loginUserFacebook, updatePlayerVisibility, updateBookCurrentChapter, updateUserBookmark} from './../redux/actions';
import {SOURCE} from './app-environment';
import TextTicker from 'react-native-text-ticker';
import * as RootNavigation from './RootNavigation';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import { useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';

const defaultConfig: {local: Local; theme: Theme} = {
  local: 'kh',
  theme: 'light',
};

let initRouteName = AppRoute.AUTH;

const App = (props: any): React.ReactElement => {
  const {userData, updateBookmark, setBookCurrentChapter, currentTheme, currentLang, bookChapter, bookDetail} = props;
  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;
  const [theme, setTheme] = React.useState(currentTheme);

  const _responseInfoCallback = (error: any, result: any) => {
    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      console.log('Success fetching data: ', result);
    }
  };

  useEffect(() => {
    (async () => {
      switchLanguage(currentLang);
    })();
  }, []);

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

  const onClosePlayer = async () => {
    await TrackPlayer.stop();
    props.setPlayerVisibility(false);
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

  // let photo = SOURCE + props.bookDetail.book.imageUrl;

  const onPlayerPress = async () => {
    props.setPlayerVisibility(false);
    let routeName = AppRoute.BOOK_READING;
    if (props.bookChapter.playerNavigation == 'listening') {
      routeName = AppRoute.BOOK_LISTENING;
    }
    RootNavigation.navigate(routeName, {});
  };

  const {book} = props.bookDetail;

  let favorite : {
    currentChapter: number;
    isAudioDownloaded: boolean; 
    isBookmarked: boolean;
    isFinished: boolean;
    isProgress: boolean;
    isStarted: boolean;
    audioLocalSource: string;
    userUuid: string;
    bookUuid: string;
  } = {
    currentChapter: 0,
    isAudioDownloaded: false, 
    isBookmarked: false,
    isFinished: false,
    isProgress: false,
    isStarted: true,
    audioLocalSource: 'na',
    userUuid: props.userData.uuid,
    bookUuid: book.uuid
  };

  const setCurrentChapter = async () => {
      let newTrack = await TrackPlayer.getCurrentTrack();
      let matchingChapter = bookChapter.chapters.find(chapter => {
        return chapter.uuid == newTrack;
      });
      setBookCurrentChapter({currentChapter: matchingChapter, book: book});
      favorite.isAudioDownloaded = props.favorite.isAudioDownloaded;
      favorite.isBookmarked = props.favorite.isBookmarked;
      favorite.isStarted = true;
      favorite.audioLocalSource = props.favorite.audioLocalSource;
      favorite.userUuid = props.userData.uuid;
      favorite.bookUuid = book.uuid;
      favorite.currentChapter = matchingChapter.chapterNumber;
      updateBookmark(favorite);
  }
  const events = [
    TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    TrackPlayer.TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  ];

  useTrackPlayerEvents(events, (event) => {
    if (event.track){
      setCurrentChapter();
    }
  });

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
      <ThemeContext.Provider
        value={{...appTheming, theme, setCurrentTheme, toggleTheme}}>
        <ApplicationProvider
          // {...eva}
          mapping={mapping}
          customMapping={appMapping}
          theme={{...eva[theme], ...appTheming}}>
          <SafeAreaProvider>
            <NavigationContainer ref={RootNavigation.navigationRef}>
              {/* <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}/> */}
              {/* <AppNavigator initialRouteName={AppRoute.HOME} /> */}
              <AppNavigator initialRouteName={initRouteName} />
              {bookChapter.currentChapter && bookChapter.playerVisibility && (
                <View style={styles.cardContainer}>
                  <TouchableOpacity
                    style={styles.touchableView}
                    onPress={onPlayerPress}>
                    <Image
                      style={styles.imageCard}
                      source={{
                        uri:
                          SOURCE +
                          props.bookChapter?.currentChapter?.book?.imageUrl,
                      }}
                    />
                    <View style={styles.labelContainer}>
                      <TextTicker
                        style={styles.textTitle}
                        duration={3000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={500}>
                        {bookChapter?.currentChapter?.currentChapter?.title}
                      </TextTicker>
                      <Text appearance="hint" category="c1">
                        {bookChapter?.currentChapter?.book?.authorname}
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
                      <Button
                        style={[styles.iconButton]}
                        appearance="ghost"
                        status="primary"
                        icon={CloseOutlineIcon}
                        onPress={onClosePlayer}
                      />
                    </View>
                  </TouchableOpacity>
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
  touchableView: {
    flex: 1,
    flexDirection: 'row',
  },
  labelContainer: {
    // flex: 1,
    position: 'relative',
    left: 10,
    height: 70,
    paddingVertical: 10,
    // width: 70,
    width: Dimensions.get('window').width - 180,
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 0,
    justifyContent: 'flex-end',
    width: 50,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    backgroundColor: '#222A43',
    borderColor: '#1C2237',
    borderWidth: 2,
    marginBottom: 2,
    height: 70,
  },
  imageCard: {
    width: 65,
    height: 65,
  },
  textTitle: {
    fontSize: 16,
    color: '#EAEEF4',
    marginBottom: 5,
  },
});

const Splash = ({loading}): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

const loadingTasks: Task[] = [
  () =>
    LoadFontsTask({
      'Hanuman-Regular': require('../assets/fonts/Hanuman-Regular.ttf'),
    }),
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
  () =>
    AccessToken.getCurrentAccessToken().then(data => {
      if (data) {
        initRouteName = AppRoute.HOME;
      }
    }),
];

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
    favorite: state.user.favorite,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlayerVisibility: playerVisibility =>
      dispatch(updatePlayerVisibility(playerVisibility)),
    fbLogin: params => dispatch(loginUserFacebook(params)),
    setBookCurrentChapter: currentChapter =>
      dispatch(updateBookCurrentChapter(currentChapter)),
    updateBookmark: (params) => dispatch(updateUserBookmark(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
