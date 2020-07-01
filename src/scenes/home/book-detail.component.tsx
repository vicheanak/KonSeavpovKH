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
  fetchBooksChapters
} from '../../redux/actions';
import {bookDetail} from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-detail';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

export type BookChapterRouteParams = {
  book: any;
};

export const BookDetailScreen = (props: any): LayoutElement => {
  // const {book} = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const [bookId, setBookId] = useState(0);

  const {bookDetail, setBookTextSizeVisibility, setBookCurrentChapter, fetchChapters, ...listProps} = props;
  const book = bookDetail.book;

  const playbackState = usePlaybackState();

  useEffect(() => {
    (async () => {
      // Check chapter exists in Playlist, if Exist in Playlist Do Nothing
      // If not in Playlist, Set to the first Chapter of the new book
      // const currentTrack = await TrackPlayer.getCurrentTrack();
      // let foundTrack = book.chapters.find(matching => {
      //   return matching.id == currentTrack;
      // });

      // if (!foundTrack) {
      //   await TrackPlayer.reset();
      //   const playlistData = Playlist.getPlaylist(book);
      //   await TrackPlayer.add(playlistData);
      // }
      // else{
      //   let currentChapterId = book.currentChapter.currentChapter.id.toString();
      //   console.log({currentChapterId, currentTrack});
      //   if (currentChapterId != currentTrack) {
      //     await TrackPlayer.stop();
      //   }
      // }
      // setBookCurrentChapter({currentChapter: props.bookDetail.book.chapters[0]});
    })();
  }, [bookId]);


  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    props.setBookmarkBookDetail(bookmarked);
  };

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={
        props.bookDetail.bookmarked
          ? BookmarkIcon
          : BookmarkOutlineIcon
      }
      onPress={onBookmarkActionPress}
    />
  );

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookCurrentChapter: currentChapter =>
      dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTextSizeVisibility: textSizeVisibility =>
      dispatch(updateBookTextSizeVisibility(textSizeVisibility)),
    fetchChapters: bookId => 
      dispatch(fetchBooksChapters(bookId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookDetailScreen);
