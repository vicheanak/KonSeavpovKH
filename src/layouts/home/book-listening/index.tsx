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
  NativeModules
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
  Divider
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {Product, ProductOption} from './extra/data';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { ProfileSetting } from './extra/profile-setting.component';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import Player from "./extra/Player";
import playlistData from "./extra/playlist.json";

const localTrack = require("./extra/pure.m4a");

// import TrackPlayer from "react-native-track-player";
// import playlistData from "./extra/playlist.json";
// import TrackPlayer, { usePlaybackState } from "react-native-track-player";

// import Player from "../components/Player";
// import playlistData from "../data/playlist.json";
// import localTrack from "../resources/pure.m4a";
// import { getCurrentTrack } from './../../../../index.d';

const AnimatedView = Animated.createAnimatedComponent(View);

const width = 50;
const pointerWidth = width * 0.47;

const product: Product = Product.centralParkApartment();

const BookmarkIcon = (style): IconElement => (
  <Icon {...style} name='bookmark-outline'/>
);

const PauseIcon = (style): IconElement => (
  <Icon {...style} name='code-outline'/>
);

const PlayIcon = (style): IconElement => (
  <Icon {...style} name='arrow-right-outline'/>
);

const SkipForwardIcon = (style): IconElement => (
  <Icon {...style} name='skip-forward-outline'/>
);

const SkipBackIcon = (style): IconElement => (
  <Icon {...style} name='skip-back-outline'/>
);

const ListIcon = (style): IconElement => (
  <Icon {...style} name='list-outline'/>
);

const ArrowLeftIcon = (style): IconElement => (
  <Icon {...style} name='arrowhead-left-outline'/>
)

const ArrowRightIcon = (style): IconElement => (
  <Icon {...style} name='arrowhead-right-outline'/>
)

export default (props: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onDoneButtonPress = (): void => {
    props.navigation.state.params.onGoBackListening();
    props.navigation && props.navigation.goBack();
  };

  const sliderOneValuesChangeStart = () => {

  }

  const sliderOneValuesChange = values => {

  };

  const sliderOneValuesChangeFinish = (value) => {
 
  };

  const playbackState = usePlaybackState();

  useEffect(() => {
    (async function f() {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      console.log('useEffect Current Track', currentTrack);
      if (!currentTrack){
        console.log('Inside Current Track');
        setup();
        togglePlayback();
      }
    })();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO
      ]
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('togglePlayback', {currentTrack});
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlistData);
      TrackPlayer.play().then(() => {
        console.log('Toggle Playback Promise ==> ');
      }).catch(() => {
        console.log('Toggle Playback Error ==>');
      })
      // await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  return (
    <View
      style={styles.container}>
        <Player
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback}
          onSkipNext15={skipNext15}
          onSkipBack15={skipBack15}
        />
        {/* <Text style={styles.state}>{getStateName(playbackState)}</Text> */}
      {/* <ProfileAvatar
        style={styles.photo}
        source={require('./assets/image-product.jpg')}
      />
      <View style={styles.titleAuthor}>
        <Text
          style={styles.title}
          category='h6'>
          Chapter 1 of 10 - Lady in Waiting
        </Text>
        <Text
          style={styles.title}
          appearance='hint'>
          by Anne Glenconner
        </Text>
      </View>
     
      <View style={styles.sliderContainer}>
        <Text category="c1" style={styles.minuteLabel}>00:10</Text>
        <MultiSlider
          min={14}
          max={22}
          values={[0]}
          sliderLength={Dimensions.get('window').width - 80}
          onValuesChangeStart={sliderOneValuesChangeStart}
          onValuesChange={sliderOneValuesChange}
          onValuesChangeFinish={sliderOneValuesChangeFinish}
        />
        <Text category="c1" style={styles.minuteLabel}>-02:37</Text>
      </View>
      <View style={styles.mediaController}>
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={SkipBackIcon}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowLeftIcon}
        />
        <Button
          style={styles.mediaButtonLarge}
          status='basic'
          icon={PauseIcon}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowRightIcon}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={SkipForwardIcon}
        />
      </View> */}
      
    </View>
  );
  
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return "None";
    case TrackPlayer.STATE_PLAYING:
      return "Playing";
    case TrackPlayer.STATE_PAUSED:
      return "Paused";
    case TrackPlayer.STATE_STOPPED:
      return "Stopped";
    case TrackPlayer.STATE_BUFFERING:
      return "Buffering";
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

async function skipNext15() {
  const progress = await TrackPlayer.getPosition();
  const newProgress = Math.floor(progress) + 15;
  console.log(newProgress);
  await TrackPlayer.play();
  await TrackPlayer.seekTo(12);
}

async function skipBack15() {
  const progress = await TrackPlayer.getPosition();
  const newProgress = Math.floor(progress) - 15;
  console.log(newProgress);
  await TrackPlayer.play();
  await TrackPlayer.seekTo(newProgress); 
  // await TrackPlayer.seekTo(newProgress);
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
    width: Dimensions.get('window').width - 100
  },
  state: {
    marginTop: 20
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  minuteLabel: {
    marginTop: 40,
    marginHorizontal: -30
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
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
    marginVertical: 10
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
    textAlign: 'center'
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold'
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
    marginLeft: 15
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
    fontWeight: 'bold'
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
