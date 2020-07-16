import React, {useState, useEffect} from 'react';
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
import {BookDetailScreenProps} from '../../navigation/home.navigator';
import {Toolbar} from '../../components/toolbar.component';
import {ImageOverlay} from '../../components/image-overlay.component';
import {ProgressBar} from '../../components/progress-bar.component';
import {Todo} from '../../data/todo.model';
import {connect} from 'react-redux';
import {
  SearchIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  ArrowIosBackIcon,
} from '../../assets/icons';
import {
  updateBookmarkBookDetail,
  updateBookTextSizeVisibility,
  updateBookCurrentChapter,
  updateBookTotalChapters,
  fetchBooksChapters,
  updatePlayerVisibility,
  fetchUserFavorite,
  createUserBookmark,
  updateUserBookmark
} from '../../redux/actions';
import {bookDetail} from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-detail';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import { Playlist } from './../../services/Playlist';

export type BookChapterRouteParams = {
  book: any;
};

export const BookDetailScreen = (props: any): LayoutElement => {
  // const {book} = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const [bookDetailId, setBookDetailId] = useState(0);

  const {fetchFavorite, favorite, bookDetail, setBookTextSizeVisibility, setBookCurrentChapter, fetchChapters, ...listProps} = props;
  const book = bookDetail.book;

  const playbackState = usePlaybackState();

  let isBookmarked = false;

  let [bookmarked, setBookmarked] = React.useState<boolean>(false);
  useEffect(() => {
    (async () => {
      // Check chapter exists in Playlist, if Exist in Playlist Do Nothing
      // If not in Playlist, Set to the first Chapter of the new book
      fetchFavorite({userUuid: '11609902-2fc2-4f39-92d2-faba81c4326d', bookUuid: book.uuid});
      setTimeout(() => {
        if (props.favorite){
          setBookmarked(props.favorite.isBookmarked);
        }
        else{
          setBookmarked(true);
        }
        console.log('bookmarked ==> ', {bookmarked});
      }, 1000);
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (!currentTrack){
        setup();
        resetPlaylist();
      }
      else{
        let foundTrack = book.chapters.find(matching => {
          return matching.uuid == currentTrack;
        });
        if (!foundTrack) {
          props.setPlayerVisibility(false);
          await TrackPlayer.stop();
          resetPlaylist();
        }
      }
    })();
  }, [bookDetailId]);



  const resetPlaylist = async () => {
      await TrackPlayer.reset();
      const playlistData = Playlist.getPlaylist(book);
      await TrackPlayer.add(playlistData);
  }

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

  const onBookmarkActionPress = (): void => {
    console.log(bookmarked);
    isBookmarked = !bookmarked;
    console.log({isBookmarked});
    setBookmarked(isBookmarked);
    if (bookmarked == undefined){
      props.createBookmark({bookId: book.id, isBookmarked: isBookmarked});
    }
    else{
      props.updateBookmark({bookId: book.id, isBookmarked: isBookmarked});
    }
  };

  const renderBookmarkAction = (): React.ReactElement => {
    // console.log('bookmarked ==> actions ==> ', bookmarked);
    return (
      <TopNavigationAction
        icon={
          bookmarked
            ? BookmarkIcon
            : BookmarkOutlineIcon
        }
        onPress={onBookmarkActionPress}
      />
    )
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={props.navigation.goBack}
    />
  );

  return (
    <React.Fragment>
      <TopNavigation
        title={book.title}
        leftControl={renderBackAction()}
        rightControls={[renderBookmarkAction()]}
      />
      <ContentView {...props}/>
    </React.Fragment>
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
    bookDetail: state.bookDetail,
    bookChapter: state.bookChapter,
    intlData: state.intlData,
    favorite: state.user.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookCurrentChapter: currentChapter =>
      dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTextSizeVisibility: textSizeVisibility =>
      dispatch(updateBookTextSizeVisibility(textSizeVisibility)),
    fetchChapters: bookId => 
      dispatch(fetchBooksChapters(bookId)),
    setPlayerVisibility: (playerVisibility) => dispatch(updatePlayerVisibility(playerVisibility)),
    fetchFavorite: (params) => dispatch(fetchUserFavorite(params)),
    updateBookmark: (bookId) => dispatch(updateUserBookmark(bookId)),
    createBookmark: (bookId) => dispatch(createUserBookmark(bookId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookDetailScreen);
