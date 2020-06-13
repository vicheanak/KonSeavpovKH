import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, LayoutElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar.component';
import { ImageOverlay } from '../../components/image-overlay.component';
import { ProgressBar } from '../../components/progress-bar.component';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import {SearchIcon, BookmarkIcon, BookmarkOutlineIcon, ArrowIosBackIcon, ArrowDownwardOutline} from '../../assets/icons';
import {updateBookmarkBookDetail, updateBookCurrentChapter, updateBookTotalChapters} from '../../redux/actions';
import { bookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-listening';

export type BookListeningRouteParams = {
    todo: Todo;
}  

export const BookListeningScreen = (props: any): LayoutElement => {

  const { todo } = props.route.params;
  console.log('Book Listening Route Params', props.route.params);
  const insets: EdgeInsets = useSafeArea();


  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    props.setBookmarkBookDetail(bookmarked);
  };

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={props.bookmarkedBookDetail.bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
      onPress={onBookmarkActionPress}
    />
  );

  const onGoBack = (): void => {
    props.route.params.onGoBack();
    props.navigation && props.navigation.goBack();
  };


  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowDownwardOutline}
      onPress={onGoBack}
    />
  );

  return (
    <React.Fragment>
      <TopNavigation
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
    bookmarkedBookDetail: state.bookmarkedBookDetail,
    currentChapter: state.currentChapter,
    totalChapters: state.totalChapters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: (bookmarked) => dispatch(updateBookmarkBookDetail(bookmarked)),
    setBookCurrentChapter: (currentChapter) => dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTotalChapters: (totalChapters) => dispatch(updateBookTotalChapters(totalChapters))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookListeningScreen);
