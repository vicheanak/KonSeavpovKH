import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, LayoutElement, Text, Divider, TopNavigation, TopNavigationAction, Card, ButtonGroup } from '@ui-kitten/components';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Toolbar } from '../../components/toolbar.component';
import { ImageOverlay } from '../../components/image-overlay.component';
import { ProgressBar } from '../../components/progress-bar.component';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import {SearchIcon, BookmarkIcon, BookmarkOutlineIcon, ArrowDownwardOutline} from '../../assets/icons';
import {updateBookmarkBookDetail, 
  updateBookCurrentChapter, 
  updateBookTextSize,
  updateBookTextSizeVisibility,
  fetchBooksChapters,
  updatePlayerVisibility,
  updatePlayerNavigation,
  updateUserBookmark,
  createUserBookmark
} from '../../redux/actions';
import { bookDetail } from './../../reducers/book-detail.reducer';
import ContentView from '../../layouts/home/book-reading';
import { ColorPaletteIcon, ListeningIcon, ListIcon } from './../../assets/icons';
import {AppRoute} from '../../navigation/app-routes';
import { ThemeContext } from '../../services/theme.service';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

export type BookReadingRouteParams = {
    todo: Todo;
}  

export const BookReadingScreen = (props: any): SafeAreaLayoutElement => {

  const insets: EdgeInsets = useSafeArea();


  const [bookId, setBookId] = useState(0);

  const {setPlayerVisibility, textSize, bookDetail, ...listProps} = props;

  const { book } = bookDetail;

  let favorite : {
    currentChapter: number;
    isAudioDownload: boolean; 
    isBookmarked: boolean;
    isFinished: boolean;
    isProgress: boolean;
    isStarted: boolean;
    audioLocalSource: string;
    userUuid: string;
    bookUuid: string;
  } = {
    currentChapter: 0,
    isAudioDownload: false, 
    isBookmarked: false,
    isFinished: false,
    isProgress: false,
    isStarted: false,
    audioLocalSource: 'na',
    userUuid: '1d222222-2fc2-4f39-92d2-faba81c4326d',
    bookUuid: book.uuid
  };

  useEffect(() => {
    props.setPlayerVisibility(false);
  }, [bookId]);

  const themeContext = React.useContext(ThemeContext);

  const onChapterListActionPress = (): void => {
    props.navigation.navigate(AppRoute.BOOK_CHAPTER);
  }
  
  const onTextSizeActionPress = (): void => {
    // Show textSize card
    
    let textVisibility = props.textSizeVisibility.textSizeVisibility;
    
    textVisibility = !textVisibility;
    
    props.setBookTextSizeVisibility({textSizeVisibility: textVisibility});
  }

  const onListeningActionPress = (): void => {
    props.navigation.navigate(AppRoute.BOOK_LISTENING);
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

  const onGoBack = (): void => {
    props.setPlayerNavigation('reading');
    props.setPlayerVisibility(true);
    props.navigation.navigate(AppRoute.BOOK);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowDownwardOutline}
      onPress={onGoBack}
    />
  );

  const setTheme = (theme): void => {
    themeContext.setCurrentTheme(theme);
    props.setBookTextSizeVisibility({textSizeVisibility: false});
  }

  const renderBookingFooter = (): React.ReactElement => (
    <View style={styles.buttonContainer}>
      <Button
        status="basic"
        appearance="outline"
        style={[styles.bookButton, styles.darkButton]}
        onPress={() => {setTheme('dark')}}>
        DARK
      </Button>
      <Button
        status="basic"
        style={[styles.bookButton, styles.lightButton]}
        onPress={() => {setTheme('light')}}>
        LIGHT
      </Button>
    </View>
  );
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
  const [sliderOneValue, setSliderOneValue] = React.useState([props.textSize.textSize]);
  
  const sliderOneValuesChangeStart = () => {
    setSliderOneChanging(true);
  }

  const sliderOneValuesChange = values => {
    // setSliderOneValue(values)
  };

  const sliderOneValuesChangeFinish = (value) => {
    props.setBookTextSize(value[0]);

    setSliderOneChanging(false);
  };

  const hideTextSizeCard = () => {
    props.setBookTextSizeVisibility({textSizeVisibility: false});
  }
  let chapterNumber = props.bookChapter.currentChapter.currentChapter.chapterNumber.toString();
  let totalChapters = book.chapters.length.toString();
  return (
    <SafeAreaLayout
    style={styles.safeArea}
    insets={[SaveAreaInset.TOP, SaveAreaInset.BOTTOM]}>
      <TopNavigation
        title={`${chapterNumber} of ${totalChapters}`}
        leftControl={renderBackAction()}
        rightControls={[
          renderChapterListAction(),
          renderTextSizeAction(),
          renderListeningAction(),
        ]}
      />
      <ContentView hideTextSizeCard={hideTextSizeCard} {...props} />
      {props.textSizeVisibility.textSizeVisibility && (
        <Card
          style={styles.bookingCard}
          appearance="filled"
          disabled={true}
          footer={renderBookingFooter}>
          <View style={styles.sliderContainer}>
            <Text style={styles.smallText}>A</Text>
            <MultiSlider
              min={14}
              max={24}
              values={[textSize]}
              sliderLength={Dimensions.get('window').width - 80}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={sliderOneValuesChange}
              onValuesChangeFinish={sliderOneValuesChangeFinish}
            />
            <Text style={styles.largeText}>A</Text>
          </View>
        </Card>
      )}
      <Divider />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  smallText: {
    fontSize: 14
  },
  largeText: {
    fontSize: 20
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row'
  },
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
  darkButton: {
    backgroundColor: 'black'
  },
  lightButton: {
    backgroundColor: 'white'
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
    bookDetail: state.bookDetail,
    textSize: state.bookReading.textSize,
    textSizeVisibility: state.bookReading.textSizeVisibility,
    bookReading: state.bookReading.data,
    bookChapter: state.bookChapter,
    favorite: state.user.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookmarkBookDetail: (bookmarked) => dispatch(updateBookmarkBookDetail(bookmarked)),
    setBookCurrentChapter: (currentChapter) => dispatch(updateBookCurrentChapter(currentChapter)),
    setBookTextSize: (textSize) => dispatch(updateBookTextSize(textSize)),
    setBookTextSizeVisibility: (textSizeVisibility) => dispatch(updateBookTextSizeVisibility(textSizeVisibility)),
    fetchChapters: (bookId) => dispatch(fetchBooksChapters(bookId)),
    setPlayerVisibility: (playerVisibility) => dispatch(updatePlayerVisibility(playerVisibility)),
    setPlayerNavigation: (playerNavigation) => dispatch(updatePlayerNavigation(playerNavigation)),
    updateBookmark: (params) => dispatch(updateUserBookmark(params)),
    createBookmark: (params) => dispatch(createUserBookmark(params))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookReadingScreen);
