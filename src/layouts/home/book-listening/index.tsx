import React, {useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions,
  Animated,
  AppRegistry,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
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
import {ImageOverlay} from './extra/image-overlay.component';
import {Product, ProductOption} from './extra/data';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ProfileSetting} from './extra/profile-setting.component';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import {usePlaybackState} from 'react-native-track-player/lib/hooks';
import Player from './extra/Player';
// import playlistData from "./extra/playlist.json";


const AnimatedView = Animated.createAnimatedComponent(View);

const width = 50;
const pointerWidth = width * 0.47;

const product: Product = Product.centralParkApartment();

export default (props: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onDoneButtonPress = (): void => {
    // props.navigation.state.params.onGoBackListening();
    props.navigation && props.navigation.goBack();
  };

  const {updateBookmark, bookChapter, bookDetail} = props;

  const sliderOneValuesChangeStart = () => {};

  const sliderOneValuesChange = values => {};

  const sliderOneValuesChangeFinish = value => {};

  const playbackState = usePlaybackState();

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
    userUuid: '1d222222-2fc2-4f39-92d2-faba81c4326d',
    bookUuid: book.uuid
  };

  const setCurrentChapter = async () => {
      let newTrack = await TrackPlayer.getCurrentTrack();
      let matchingChapter = bookChapter.chapters.find(chapter => {
        return chapter.uuid == newTrack;
      });
      props.setBookCurrentChapter({currentChapter: matchingChapter, book: book});
      favorite.isAudioDownloaded = props.favorite.isAudioDownloaded;
      favorite.isBookmarked = props.favorite.isBookmarked;
      favorite.isStarted = true;
      favorite.audioLocalSource = props.favorite.audioLocalSource;
      favorite.userUuid = '1d222222-2fc2-4f39-92d2-faba81c4326d';
      favorite.bookUuid = book.uuid;
      favorite.currentChapter = matchingChapter.chapterNumber;
      updateBookmark(favorite);
  }

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      // setCurrentChapter();
    } catch (_) {}
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      // setCurrentChapter();
    } catch (_) {}
  }

  const skipNext15 = async () => {
    console.log('Skip Next 15');
    const progress = await TrackPlayer.getPosition();
    const newProgress = Math.floor(progress) + 15;
    console.log({progress, newProgress});
    // await TrackPlayer.play();
    await TrackPlayer.seekTo(newProgress);
  }

  const skipBack15 = async () => {
    console.log('Skip Back 15');
    const progress = await TrackPlayer.getPosition();
    const newProgress = Math.floor(progress) - 15;
    await TrackPlayer.play();
    await TrackPlayer.seekTo(newProgress);
    // await TrackPlayer.seekTo(newProgress);
  }

  useEffect(() => {
    (async () => {
      TrackPlayer.addEventListener('playback-track-changed', async (trackChanged) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(currentTrack);
        setCurrentChapter();
      });
      TrackPlayer.addEventListener('playback-queue-ended', async (trackEnded) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(currentTrack);
        setCurrentChapter();
      });
    })();
  }, []);

  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
    });
  }

  const togglePlayback = async () => {
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else if (playbackState === TrackPlayer.STATE_NONE) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // if (currentTrack == null) {
    //   await TrackPlayer.reset();
    //   const playlistData = Playlist.getPlaylist(bookDetail);
    //   console.log({playlistData});
    //   await TrackPlayer.add(playlistData);
    //   await TrackPlayer.play();
    // } else {
    //   await TrackPlayer.play();
    // }
  }

  return (
    <View style={styles.container}>
      <Player
        onNext={skipToNext}
        style={styles.player}
        onPrevious={skipToPrevious}
        onTogglePlayback={togglePlayback}
        onSkipNext={skipNext15}
        onSkipBack={skipBack15}
        {...props}
      />
    </View>
  );
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    backgroundColor: 'background-basic-color-2',
    justifyContent: 'center',
  },
  player: {
    alignSelf: 'center',
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 100,
  },
  state: {
    marginTop: 20,
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  minuteLabel: {
    marginTop: 40,
    marginHorizontal: -30,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  photo: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 16,
  },
  mediaButtonLarge: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  mediaButtonSmall: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 20,
    height: 20,
    borderRadius: 24,
  },
  description: {
    padding: 24,
    backgroundColor: 'background-basic-color-1',
  },
  setting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  whoText: {
    marginVertical: 10,
  },
  titleAuthor: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
    // width: Dimensions.get('window').width,
    textAlign: 'center',
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold',
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
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
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
