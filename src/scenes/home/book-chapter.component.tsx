import React from 'react';
import { ListRenderItemInfo, Image, View } from 'react-native';
import {  
  Input,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  StyleService,
  Text,
  useStyleSheet,
  Select, 
  Divider,
  Button } from '@ui-kitten/components';
// import { SavedScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon, StarIcon, ArrowIosForwardIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import { BookmarkIcon } from './../../assets/icons';
import { bookDetail } from './../../reducers/book-detail.reducer';
import { updateBookCurrentChapter,updateUserBookmark } from './../../redux/actions';
import * as RootNavigation from '../../app/RootNavigation';
import TrackPlayer from 'react-native-track-player';


const allTodos: Todo[] = [
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
];

export type BookDetailRouteParams = {
    todo: Todo;
}

const BookChapterScreen = (props: any): SafeAreaLayoutElement => {

  const [todos, setTodos] = React.useState<Todo[]>(allTodos);
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);


  const defaultOptions: any[] = [
    { id: 1, text: props.intlData.messages['read_in_progress'] },
    { id: 2, text: props.intlData.messages['done_reading'] },
    { id: 3, text: props.intlData.messages['finished_downloads'] },
    { id: 4, text: props.intlData.messages['not_yet_read'] },
  ];

  const { userData, bookChapter, bookDetail, setBookCurrentChapter, updateBookmark } = props;

  const {book} = bookDetail;
  const userUuid = userData.uuid;

  const [selectedOption, setSelectedOption] = React.useState(defaultOptions);

  let favorite : {
    currentChapter: number;
    isAudioDownloaded: boolean; 
    isBookmarked: boolean;
    isFinished: boolean;
    isProgress: boolean;
    isStarted: boolean;
    audioLocalSource: string;
    userUuid: string;
    bookUuid: string;
  } = {
    currentChapter: 0,
    isAudioDownloaded: false, 
    isBookmarked: false,
    isFinished: false,
    isProgress: false,
    isStarted: false,
    audioLocalSource: 'na',
    userUuid: userUuid,
    bookUuid: book.uuid
  };

  if (props.favorite){
    favorite.currentChapter = props.favorite.currentChapter;
    favorite.isAudioDownloaded = props.favorite.isAudioDownloaded;
    favorite.isBookmarked = props.favorite.isBookmarked;
    favorite.audioLocalSource = props.favorite.audioLocalSource;
    favorite.userUuid = userUuid;
    favorite.isStarted = true;
    favorite.userUuid = userUuid;
    favorite.bookUuid = book.uuid;
  }

  const onSelect = (option) => {
    setSelectedOption(option);
  };

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter((todo: Todo): boolean => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    setTodos(nextTodos);
    setQuery(query);
  };

  const onGoBack = () => {
    let routeName = AppRoute.BOOK_READING;
    if (props.bookChapter.playerNavigation == 'listening'){
      routeName = AppRoute.BOOK_LISTENING;
    }
    RootNavigation.navigate(routeName, {});
  }

  const navigateBookChapter = async (chapterIndex: number): void => {
    const { [chapterIndex]: chapter } = book.chapters;
    setBookCurrentChapter({currentChapter: chapter, book: book});
    favorite.currentChapter = chapter.chapterNumber;
    updateBookmark(favorite);
    let routeName = AppRoute.BOOK_READING;
    if (props.bookChapter.playerNavigation == 'listening'){
      routeName = AppRoute.BOOK_LISTENING;
    }
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack){
      await TrackPlayer.skip(chapter.uuid.toString());
      // await TrackPlayer.play();
    }

    // props.navigation.navigate(AppRoute.BOOK_READING);
    RootNavigation.navigate(routeName, {});
  };

  const renderChapters = ({ item }: ListRenderItemInfo<any>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={navigateBookChapter}>
      <Text style={styles.chapterLabel} status="primary">{item.chapterNumber}</Text>
      <View style={styles.detailsContainer}>
        <Text category='s1'>
          {item.title}
        </Text>
      </View>
    </ListItem>
  );

  return (
    <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title={props.intlData.messages['chapters']}
      onBackPress={onGoBack}
    />
    <Divider/>
    <Layout style={styles.container} level='1'>
      <List
        style={styles.list}
        data={book.chapters}
        renderItem={renderChapters}
        ItemSeparatorComponent={Divider}
      />
    </Layout>

  </SafeAreaLayout>
   
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: "background-basic-color-1"
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
  image: {
    width: 70,
    height: 70,
    padding: 16,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  chapterLabel: {
      fontSize: 30,
    //   fontWeight: 'bold',
      lineHeight: 40,
      marginHorizontal: 10
  }
});



const mapStateToProps = state => {
  return {
    intlData: state.intlData,
    bookDetail: state.bookDetail,
    favorite: state.user.favorite,
    bookChapter: state.bookChapter,
    userData: state.user.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookCurrentChapter: (currentChapter) => dispatch(updateBookCurrentChapter(currentChapter)),
    updateBookmark: (params) => dispatch(updateUserBookmark(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookChapterScreen);
