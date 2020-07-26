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
import TrackPlayer from 'react-native-track-player';
import { Playlist } from './../../services/Playlist';

import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

export type BookChapterRouteParams = {
  book: any;
};

export const BookDetailScreen = (props: any): SafeAreaLayoutElement => {
  // const {book} = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const {fetchFavorite, favorite, bookDetail, setBookTextSizeVisibility, setBookCurrentChapter, fetchChapters, ...listProps} = props;
  const book = bookDetail.book;

  let isBookmarked = false;


  useEffect(() => {
    (async () => {
      // fetchFavorite({userUuid: '1d222222-2fc2-4f39-92d2-faba81c4326d', bookUuid: book.uuid});
      props.setPlayerVisibility(false);
    })();
  }, []);


  const setChapters = () => {
    // let matchingChapter = bookChapter.chapters.find(chapter => {
    //   return chapter.chapterNumber == 1;
    // });
    // console.log({matchingChapter});
    // props.setBookCurrentChapter({currentChapter: book.chapters[0], book: book});
  }


  const onBookmarkActionPress = (): void => {
    if (props.favorite == undefined){
      props.createBookmark({userUuid: '1d222222-2fc2-4f39-92d2-faba81c4326d', bookUuid: book.uuid, isBookmarked: true});
    }
    else{
      props.updateBookmark({userUuid: '1d222222-2fc2-4f39-92d2-faba81c4326d', bookUuid: book.uuid, isBookmarked: !props.favorite?.isBookmarked});
    }
  };

  const renderBookmarkAction = (): React.ReactElement => {
    return (
      <TopNavigationAction
        icon={
          props.favorite?.isBookmarked
            ? BookmarkIcon
            : BookmarkOutlineIcon
        }
        onPress={onBookmarkActionPress}
      />
    )
  };

  const onGoBack = (): void => {
    let isCurrentChapterExist = Object.keys(props.bookChapter.currentChapter).length
    let playerVisibility = isCurrentChapterExist ? true : false;
    props.setPlayerVisibility(playerVisibility);
    let bookCurrentChapter = props.bookChapter.currentChapter.book;
    if (bookCurrentChapter){
      fetchChapters(bookCurrentChapter.uuid);
    }
    props.navigation.goBack();
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={onGoBack}
    />
  );

  return (
    <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
      <TopNavigation
        title={book.title}
        leftControl={renderBackAction()}
        rightControls={[renderBookmarkAction()]}
      />
      <ContentView {...props}/>
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
    fetchChapters: (bookUuid) => dispatch(fetchBooksChapters(bookUuid)),
    setPlayerVisibility: (playerVisibility) => dispatch(updatePlayerVisibility(playerVisibility)),
    fetchFavorite: (params) => dispatch(fetchUserFavorite(params)),
    updateBookmark: (params) => dispatch(updateUserBookmark(params)),
    createBookmark: (params) => dispatch(createUserBookmark(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookDetailScreen);
