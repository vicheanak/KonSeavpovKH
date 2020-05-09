import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, LayoutElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar.component';
import { ImageOverlay } from '../../components/image-overlay.component';
import { ProgressBar } from '../../components/progress-bar.component';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import {SearchIcon, BookmarkIcon, BookmarkOutlineIcon, ArrowIosBackIcon} from '../../assets/icons';
import {updateBookmarkBookDetail, updateBookCurrentChapter, updateBookTotalChapters} from '../../redux/actions';
import { bookmarkedBookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-reading';
import { ColorPaletteIcon, ListeningIcon, ListIcon } from './../../assets/icons';
import { AppRoute } from 'src/navigation/app-routes';

export type BookReadingRouteParams = {
    todo: Todo;
}  

export const BookReadingScreen = (props: any): LayoutElement => {

  console.log('Book Reading Screen', props);
  const { todo } = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    console.log('onBOokmark', bookmarked);
    console.log('props.bookmarkedBookDetail', props.bookmarkedBookDetail.bookmarked);
    props.setBookmarkBookDetail(bookmarked);
  };

  const onChapterListActionPress = (): void => {
    // props.navigation.navigate(AppRoute.CHAPTER_LIST);
  }

  const onTextSizeActionPress = (): void => {
    // Show textSize card
  }

  const onListeningActionPress = (): void => {
    // props.navigation.navigate(AppRoute.LISTENING);
  }

  const renderChapterListAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ListIcon}
      onPress={onChapterListActionPress}
    />
  );

  const renderTextSizeAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ColorPaletteIcon}
      onPress={onTextSizeActionPress}
    />
  );

  const renderListeningAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ListeningIcon}
      onPress={onListeningActionPress}
    />
  );

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={props.navigation.goBack}
    />
  );

  
  // props.setBookCurrentChapter({currentChapter: 2});
  // props.setBookTotalChapters({totalChapters: 10});
  // console.log('props', props);

  return (
    <React.Fragment>
      <TopNavigation
          title='Product Details'
          leftControl={renderBackAction()}
          rightControls={[renderChapterListAction(), renderTextSizeAction(), renderListeningAction()]}
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
  }
});


const mapStateToProps = state => {
  console.log(state);
  return {
    bookmarkedBookDetail: state.bookmarkedBookDetail,
    currentChapter: state.bookReading.currentChapter,
    totalChapters: state.bookReading.totalChapters
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
)(BookReadingScreen);
