import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, LayoutElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar.component';
import { ProgressBar } from '../../components/progress-bar.component';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import {SearchIcon, BookmarkIcon, BookmarkOutlineIcon, ArrowIosBackIcon, ArrowDownwardOutline, TextIcon, BookIcon} from '../../assets/icons';
import {updatePlayerNavigation, updateBookmarkBookDetail, updateBookCurrentChapter, updateBookTotalChapters, updatePlayerVisibility} from '../../redux/actions';
import { bookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-listening';
import {AppRoute} from '../../navigation/app-routes';

export type BookListeningRouteParams = {
    todo: Todo;
}  

export const BookListeningScreen = (props: any): LayoutElement => {

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    props.setBookmarkBookDetail(bookmarked);
  };

  
  const onGoBack = (): void => {
    props.setPlayerVisibility(true);
    props.setPlayerNavigation('listening');
    props.navigation.navigate(AppRoute.BOOK_DETAIL);
  };


  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowDownwardOutline}
      onPress={onGoBack}
    />
  );

  const onBookReading = (): void => {
    props.navigation.navigate(AppRoute.BOOK_READING);
  }

  const renderBookReading = (): React.ReactElement => (
    <TopNavigationAction
      icon={
        TextIcon
      }
      onPress={onBookReading}
    />
  );


  return (
    <React.Fragment>
      <TopNavigation
          leftControl={renderBackAction()}
          rightControls={[renderBookReading()]}
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
    bookmarkedBookDetail: state.bookmarkedBookDetail,
    currentChapter: state.currentChapter,
    totalChapters: state.totalChapters,
    bookDetail: state.bookDetail,
    bookChapter: state.bookChapter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: (bookmarked) => dispatch(updateBookmarkBookDetail(bookmarked)),
    setBookCurrentChapter: (currentChapter) => dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTotalChapters: (totalChapters) => dispatch(updateBookTotalChapters(totalChapters)),
    setPlayerVisibility: (playerVisibility) => dispatch(updatePlayerVisibility(playerVisibility)),
    setPlayerNavigation: (playerNavigation) => dispatch(updatePlayerNavigation(playerNavigation))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookListeningScreen);
