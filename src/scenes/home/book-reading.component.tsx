import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, LayoutElement, Text, Divider, TopNavigation, TopNavigationAction, Card, ButtonGroup } from '@ui-kitten/components';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar.component';
import { ImageOverlay } from '../../components/image-overlay.component';
import { ProgressBar } from '../../components/progress-bar.component';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import {SearchIcon, BookmarkIcon, BookmarkOutlineIcon, ArrowIosBackIcon} from '../../assets/icons';
import {updateBookmarkBookDetail, 
  updateBookCurrentChapter, 
  updateBookTotalChapters, 
  updateBookTextSize,
  updateBookTextSizeVisibility} from '../../redux/actions';
import { bookmarkedBookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-reading';
import { ColorPaletteIcon, ListeningIcon, ListIcon } from './../../assets/icons';
import {AppRoute} from '../../navigation/app-routes';
import { ThemeContext } from '../../services/theme.service';

export type BookReadingRouteParams = {
    todo: Todo;
}  

export const BookReadingScreen = (props: any): LayoutElement => {

  const { todo } = props.route.params;
  const insets: EdgeInsets = useSafeArea();

  const themeContext = React.useContext(ThemeContext);

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
    
  
    props.setBookmarkBookDetail(bookmarked);
  };

  const onChapterListActionPress = (): void => {
    // props.navigation.navigate(AppRoute.CHAPTER_LIST);
  }
  
  const onTextSizeActionPress = (): void => {
    // Show textSize card
    
    let textVisibility = props.textSizeVisibility.textSizeVisibility;
    
    textVisibility = !textVisibility;
    
    props.setBookTextSizeVisibility({textSizeVisibility: textVisibility});
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

  
  const onReadingButtonPress = (): void => {
    let todo = {
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      id: 0,
      photo: 3,
      progress: 33,
      title: 'Learn React Navigation 5',
    };
    props.navigation.navigate(AppRoute.BOOK_READING, {todo});
  };

  const onListeningButtonPress = (): void => {
    let todo = {
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      id: 0,
      photo: 3,
      progress: 33,
      title: 'Learn React Navigation 5',
    };
    props.navigation.navigate(AppRoute.BOOK_LISTENING, {todo});
  };

  const setTheme = (theme): void => {
    themeContext.setCurrentTheme(theme);
    props.setBookTextSizeVisibility({textSizeVisibility: false});
  }

  const renderBookingFooter = (): React.ReactElement => (
    <View style={styles.buttonContainer}>
      <Button
        status="basic"
        appearance="outline"
        style={styles.bookButton}
        onPress={() => {setTheme('dark')}}>
        DARK
      </Button>
      <Button
        status="basic"
        style={styles.bookButton}
        onPress={() => {setTheme('light')}}>
        LIGHT
      </Button>
    </View>
  );


  return (
    <React.Fragment>
      <TopNavigation
          title='Product Details'
          leftControl={renderBackAction()}
          rightControls={[renderChapterListAction(), renderTextSizeAction(), renderListeningAction()]}
        />
        <ContentView {...props}/>
        {props.textSizeVisibility.textSizeVisibility && <Card
          style={styles.bookingCard}
          appearance="filled"
          disabled={true}
          footer={renderBookingFooter}>
            <View>
              <Text category="s1">Short description goes to very here</Text>
            </View>
        </Card>}
        <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  bookingCard: {
    position: 'absolute',
    top: 55,
    width: Dimensions.get('window').width,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookButton: {
    width: 150,
  },
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
  return {
    bookmarkedBookDetail: state.bookmarkedBookDetail,
    currentChapter: state.bookReading.currentChapter,
    totalChapters: state.bookReading.totalChapters,
    textSize: state.bookReading.textSize,
    textSizeVisibility: state.bookReading.textSizeVisibility
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: (bookmarked) => dispatch(updateBookmarkBookDetail(bookmarked)),
    setBookCurrentChapter: (currentChapter) => dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTotalChapters: (totalChapters) => dispatch(updateBookTotalChapters(totalChapters)),
    setBookTextSize: (textSize) => dispatch(updateBookTextSize(textSize)),
    setBookTextSizeVisibility: (textSizeVisibility) => dispatch(updateBookTextSizeVisibility(textSizeVisibility))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookReadingScreen);
