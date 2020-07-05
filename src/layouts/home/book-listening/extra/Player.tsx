import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player";
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
  // console.log({progress, currentTime, totalDuration, remainingTime});
  // console.log({duration});

  
  return (
    <View style={styles.progressContainer}>
      <Text category="s2" appearance="hint" style={[styles.timeLabel, styles.timeCurrent]}>{currentTime}</Text>
      <View style={styles.progress}>
        {/* <View style={{ flex: progress.position, backgroundColor: "red" }} /> */}
        <Slider
          value={0}
          onSlidingComplete={value => {
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

  useEffect(() => {
    (async function f() {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(currentTrack);
      if (currentTrack){
        const { title, artist, artwork } = track || {};
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        onTogglePlayback();
      }
    })();
  }, []);


  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist, artwork } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });
  

  const { style, onNext, onPrevious, onTogglePlayback, onSkipNext, onSkipBack } = props;

  let playPauseButton = PlayIcon;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    playPauseButton = PauseIcon;
  }


  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{ uri: trackArtwork }} />
      <ProgressBar />
      <View style={styles.titleAuthor}>
        <TextTicker
          style={styles.title}
          duration={5000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={100}>
          {trackTitle} Whatever is long goes here ...
        </TextTicker>
        <Text style={styles.artist}>{trackArtist}</Text>
      </View>
    
      <View style={styles.mediaController}>
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={SkipBackIcon}
          onPress={onPrevious}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowLeftIcon}
          onPress={onSkipBack}
        />
        <Button
          style={styles.mediaButtonLarge}
          status='basic'
          icon={playPauseButton}
          onPress={onTogglePlayback}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
          icon={ArrowRightIcon}
          onPress={onSkipNext}
        />
        <Button
          style={styles.mediaButtonSmall}
          status='basic'
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
    color: '#EAEEF4',
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
