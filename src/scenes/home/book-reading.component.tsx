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
import {updateBookmarkBookDetail} from '../../redux/actions';
import { bookmarkedBookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-reading';
import { ColorPaletteIcon, ListeningIcon, ListIcon } from './../../assets/icons';

export type BookReadingRouteParams = {
    todo: Todo;
}  

export const BookReadingScreen = (props: any): LayoutElement => {

  const { todo } = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    console.log('onBOokmark', bookmarked);
    console.log('props.bookmarkedBookDetail', props.bookmarkedBookDetail.bookmarked);
    props.setBookmarkBookDetail(bookmarked);
  };

  const renderChapterAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ListIcon}
      onPress={onBookmarkActionPress}
    />
  );

  const renderTextSizeAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ColorPaletteIcon}
      onPress={onBookmarkActionPress}
    />
  );

  const renderListeningAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ListeningIcon}
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
          title='Product Details'
          leftControl={renderBackAction()}
          rightControls={[renderChapterAction(), renderTextSizeAction(), renderListeningAction()]}
        />
        <ContentView />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: (bookmarked) => dispatch(updateBookmarkBookDetail(bookmarked))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookReadingScreen);
