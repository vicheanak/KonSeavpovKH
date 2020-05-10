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
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
    props.navigation.navigate(AppRoute.BOOK_CHAPTER);
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
    // console.log('change start');
    setSliderOneChanging(true);
  }

  const sliderOneValuesChange = values => {
    // console.log('value', values);
    // setSliderOneValue(values)
  };

  const sliderOneValuesChangeFinish = (value) => {
    console.log('value', value[0]);
    props.setBookTextSize({textSize: value[0]});
    console.log(props.textSize);

    setSliderOneChanging(false);
  };

  const hideTextSizeCard = () => {
    props.setBookTextSizeVisibility({textSizeVisibility: false});
  }

  return (
    <React.Fragment>
      <TopNavigation
        title="Product Details"
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
            <Text style={styles.smallText}>ក</Text>
            <MultiSlider
              min={14}
              max={22}
              values={sliderOneValue}
              sliderLength={Dimensions.get('window').width - 80}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={sliderOneValuesChange}
              onValuesChangeFinish={sliderOneValuesChangeFinish}
            />
            <Text style={styles.largeText}>ក</Text>
          </View>
        </Card>
      )}
      <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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