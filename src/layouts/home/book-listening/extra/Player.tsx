import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import TrackPlayer from "react-native-track-player";
import {useTrackPlayerEvents, useTrackPlayerProgress, usePlaybackState} from 'react-native-track-player/lib/hooks';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  ImageStyle,
  Dimensions
} from "react-native";
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
import TextTicker from 'react-native-text-ticker';
import Slider from "@brlja/react-native-slider";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {SOURCE} from './../../../../app/app-environment';
import { bookChapter } from "src/reducers/book-chapter.reducer";

function secondsToTime(e){
  var h = Math.floor(e / 3600).toString().padStart(2,'0'),
      m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
      s = Math.floor(e % 60).toString().padStart(2,'0');
  
  return m + ':' + s;
}

function ProgressBar() {
  const progress = useTrackPlayerProgress();
  let currentTime = secondsToTime(progress.position);
  let totalDuration = secondsToTime(progress.duration);
  let remainingTime = secondsToTime(progress.duration - progress.position);

  let currentDuration = 0;
  if (progress.duration > 0){
    currentDuration = progress.position / progress.duration;
  }
  
  return (
    <View style={styles.progressContainer}>
      <Text category="s2" appearance="hint" style={[styles.timeLabel, styles.timeCurrent]}>{currentTime}</Text>
      <View style={styles.progress}>
        {/* <View style={{ flex: progress.position, backgroundColor: "red" }} /> */}
        <Slider
          value={currentDuration}
          onSlidingComplete={value => {
            // let seekTo = progress.duration * value[0] / 100;
            let seekTo = progress.duration * value;
            TrackPlayer.seekTo(seekTo);
            TrackPlayer.play();
          }}
          thumbTintColor="#dfd01e"
          minimumTrackTintColor="#dfd01e"
        />
        {/* <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor: "grey"
          }}
        /> */}
      </View>
      <Text category="s2" appearance="hint" style={[styles.timeLabel, styles.timeRemaining]}>{remainingTime}</Text>
    </View>
  );
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};


const BookmarkIcon = (style): IconElement => (
  <Icon {...style} name='bookmark-outline'/>
);

const PauseIcon = (style): ImageStyle => {
  const pauseImage = require('../assets/pause.png');
  return (
    <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={pauseImage} />
  )
}

const PlayIcon = (style): ImageStyle => {
  const playImage = require('../assets/play.png');
  return (
    <Image style={{width: 20, height: 20, marginHorizontal: 10}} source={playImage} />
  )
};

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

export default function Player(props) {
  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState("");

  const { style, onNext, onPrevious, onTogglePlayback, onSkipNext, onSkipBack } = props;

  let playPauseButton = PlayIcon;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    playPauseButton = PauseIcon;
  }

  useLayoutEffect(()=> {
  },[]);

  useEffect(() => {
  }, []);

  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{ uri: SOURCE + props.bookChapter?.currentChapter?.book?.imageUrl }} />
      <ProgressBar />
      <View style={styles.titleAuthor}>
        <TextTicker
          style={styles.title}
          duration={5000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={100}>
          {props.bookChapter?.currentChapter?.currentChapter?.chapterNumber} of {props.bookChapter?.chapters?.length} - {props.bookChapter?.currentChapter?.currentChapter?.title}
        </TextTicker>
        <Text style={styles.artist}>{trackArtist}</Text>
      </View>
    
      <View style={styles.mediaController}>
        <Button
          style={styles.mediaButtonSmall}
          appearance='ghost'
          status='primary'
          icon={SkipBackIcon}
          onPress={onPrevious}
        />
        {/* <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowLeftIcon}
          onPress={onSkipBack}
        /> */}
        <Button
          style={styles.mediaButtonLarge}
          appearance='ghost'
          status='primary'
          icon={playPauseButton}
          onPress={onTogglePlayback}
        />
        {/* <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowRightIcon}
          onPress={onSkipNext}
        /> */}
        <Button
          style={styles.mediaButtonSmall}
          appearance='ghost'
          status='primary'
          icon={SkipForwardIcon}
          onPress={onNext}
        />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  titleAuthor: {
    marginTop: -30,
  },
  timeLabel: {
    position: 'relative',
    top: 40
  },
  timeCurrent: {
    left: 40
  },
  timeRemaining: {
    right: 40
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    height: 20,
    position: 'relative',
    width: Dimensions.get('window').width - 20,
    top: 30
    // marginTop: 50,
    // left: 20
  },
  progress: {
    // height: 3,
    // width: Dimensions.get('window').width - 50,
    width: 400,
    // marginTop: 10,
    // flexDirection: "row"
    // borderWidth: 2,
    height: 50,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    marginTop: 30
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
  card: {
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
  cover: {
    width: 250,
    height: 250,
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    // color: '#EAEEF4',
    marginBottom: 20
  },
  artist: {
    textAlign: 'center',
    fontWeight: "bold"
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});
