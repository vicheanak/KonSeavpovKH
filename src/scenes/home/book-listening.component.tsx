import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Layout,
  LayoutElement,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {EdgeInsets, useSafeArea} from 'react-native-safe-area-context';
import {Toolbar} from '../../components/toolbar.component';
import {ProgressBar} from '../../components/progress-bar.component';
import {Todo} from '../../data/todo.model';
import {connect} from 'react-redux';
import {
  SearchIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  ArrowIosBackIcon,
  ArrowDownwardOutline,
  TextIcon,
  BookIcon,
  ListIcon
} from '../../assets/icons';
import {
  updatePlayerNavigation,
  updateBookmarkBookDetail,
  updateBookCurrentChapter,
  updateBookTotalChapters,
  updatePlayerVisibility,
  updateUserBookmark,
} from '../../redux/actions';
import {bookDetail} from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-listening';
import {AppRoute} from '../../navigation/app-routes';
import TrackPlayer from 'react-native-track-player';
// import {usePlaybackState, useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {Playlist} from './../../services/Playlist';

export type BookListeningRouteParams = {
  todo: Todo;
};

export const BookListeningScreen = (props: any): SafeAreaLayoutElement => {
  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const {bookChapter} = props;
  const {book} = props.bookDetail;


  useEffect(() => {
    (async () => {
      props.setPlayerVisibility(false);
      // const currentTrack = await TrackPlayer.getCurrentTrack();
      // if (!currentTrack || currentTrack == 'undefined') {
      //   await setup();
      //   await resetPlaylist();
      // } else {
      //   let foundTrack = book.chapters.find(matching => {
      //     return matching.uuid == currentTrack;
      //   });
      //   if (!foundTrack) {
      //     await resetPlaylist();
      //   }
      // }
      await TrackPlayer.destroy();
      await setup();
      await resetPlaylist();
      await TrackPlayer.skip(bookChapter.currentChapter.currentChapter.uuid.toString());
      await TrackPlayer.play();
    })();
  }, []);


  const resetPlaylist = () => {
    return new Promise(async (resolve, reject) => {
      await TrackPlayer.reset();
      const playlistData = Playlist.getPlaylist(book);
      await TrackPlayer.add(playlistData);
      return resolve(true);
    });
  };

  const setup = () => {
    return new Promise(async (resolve, reject) => {
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
      resolve(true);
    });
  };

  const onGoBack = (): void => {
    props.setPlayerNavigation('listening');
    props.setPlayerVisibility(true);
    props.navigation.navigate(AppRoute.BOOK);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowDownwardOutline} onPress={onGoBack} />
  );

  const onBookReading = (): void => {
    props.navigation.navigate(AppRoute.BOOK_READING);
  };

  const renderBookReading = (): React.ReactElement => (
    <TopNavigationAction icon={TextIcon} onPress={onBookReading} />
  );

  const onChapterListActionPress = (): void => {
    props.setPlayerNavigation('listening');
    props.navigation.navigate(AppRoute.BOOK_CHAPTER);
  }

  const renderChapterListAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ListIcon}
      onPress={onChapterListActionPress}
    />
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets={[SaveAreaInset.TOP]}>
      <TopNavigation
        leftControl={renderBackAction()}
        rightControls={[
          renderChapterListAction(), 
          // renderBookReading()
        ]}
      />
      <ContentView {...props} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  appBar: {
    height: 192,
  },
  title: {
    marginVertical: 4,
  },
  progressBar: {
    width: '50%',
    marginVertical: 16,
  },
});

const mapStateToProps = state => {
  return {
    bookmarkedBookDetail: state.bookmarkedBookDetail,
    currentChapter: state.currentChapter,
    totalChapters: state.totalChapters,
    bookDetail: state.bookDetail,
    bookChapter: state.bookChapter,
    favorite: state.user.favorite,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: bookmarked =>
      dispatch(updateBookmarkBookDetail(bookmarked)),
    setBookCurrentChapter: currentChapter =>
      dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTotalChapters: totalChapters =>
      dispatch(updateBookTotalChapters(totalChapters)),
    setPlayerVisibility: playerVisibility =>
      dispatch(updatePlayerVisibility(playerVisibility)),
    setPlayerNavigation: playerNavigation =>
      dispatch(updatePlayerNavigation(playerNavigation)),
    updateBookmark: (params) => dispatch(updateUserBookmark(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookListeningScreen);
