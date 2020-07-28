import React, {useState, useEffect, useCallback} from 'react';
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
  IndexPath, 
  Select, 
  SelectItem,
  Divider,
  Button
} from '@ui-kitten/components';
import { ReadingScreenProps } from '../../navigation/home.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBarLibrary } from '../../components/progress-bar.component';
import { SearchIcon, StarIcon, ArrowIosForwardIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import { SOURCE } from '../../app/app-environment';
import {
  fetchUserFavorites,
  updateBookDetail,
  fetchBooksChapters,
  fetchUserFavorite,
} from '../../redux/actions';


const ReadingScreen = (props: any): ListElement => {

  // const [todos, setTodos] = React.useState<any[]>(allTodos);
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);

  const { setBookDetail, fetchChapters, fetchFavorite, userData, favorites, getUserFavorites } = props;


  useEffect(() => {
    // props.fetchPeople();
    // props.fetchBooks();
    (async () => {
    })();
  }, []);
  const defaultOptions: any[] = [
    { id: 1, text: props.intlData.messages['read_in_progress'] },
    { id: 2, text: props.intlData.messages['done_reading'] },
    { id: 3, text: props.intlData.messages['finished_downloads'] },
    { id: 4, text: props.intlData.messages['not_yet_read'] },
  ];

  const [selectedOption, setSelectedOption] = React.useState(defaultOptions);

  const onSelect = (option) => {
    setSelectedOption(option);
  };

  const onChangeQuery = (query: string): void => {
    const nextTodos: any = props.favorites.filter((favorite: any): boolean => {
      return favorite.title.toLowerCase().includes(query.toLowerCase());
    });

    // setTodos(nextTodos);
    setQuery(query);
  };

  const navigateBookDetail = (bookIndex: number): void => {
    const {[bookIndex]: book} = favorites;
    setBookDetail(book);
    fetchChapters(book.uuid);
    fetchFavorite({userUuid: userData.uuid, bookUuid: book.uuid});
    props.navigation.navigate(AppRoute.BOOK_DETAIL);
  };

  const renderReading = ({ item }: ListRenderItemInfo<Todo>): ListItemElement => {
    let photo = SOURCE + item?.imageUrl;
    let allChapters = item?.chapters?.length;
    let currentChapter = item?.favorite?.currentChapter;
    let progress = Math.round((currentChapter * 100) / allChapters);

    return (
    <ListItem
      style={styles.item}
      onPress={navigateBookDetail}>
      <Image
        style={styles.image}
        // source={item.photo}
        source={{uri: photo}}
      />
      <View style={styles.detailsContainer}>
        <Text category='s1'>
          {item.title}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {item.authorname} 
        </Text>
        <ProgressBarLibrary
          style={styles.itemProgressBar}
          progress={progress}
          text={`${progress}%`}
        />
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status="primary"
        icon={ArrowIosForwardIcon}
      />
    </ListItem>
  )
};

  const onRefresh = () => {
    getUserFavorites(userData.uuid);
  }
  return (
    <Layout style={styles.container} level='1'>
      {/* <Input
        style={styles.filterInput}
        placeholder={props.intlData.messages['search']}
        value={query}
        icon={SearchIcon}
        onChangeText={onChangeQuery}
      />
      <Select
        style={styles.filterInput}
        placeholder={props.intlData.messages['filter']}
        data={defaultOptions}
        selectedOption={selectedOption}
        onSelect={onSelect}
      /> */}
      <Button onPress={onRefresh} textStyle={{fontSize: 15, lineHeight: 25}}>
        {props.intlData.messages['refresh']}
      </Button>
      <List
        style={styles.list}
        data={props.favorites}
        renderItem={renderReading}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    // height: 500,
    padding: 16,
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  item: {
    // flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '100%',
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
});


const mapStateToProps = state => {
  return {
    intlData: state.intlData,
    favorites: state.user.favorites,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBookDetail: (book) => dispatch(updateBookDetail(book)),
    fetchChapters: bookId => 
      dispatch(fetchBooksChapters(bookId)),
    fetchFavorite: (params) => dispatch(fetchUserFavorite(params)),
   getUserFavorites: (userUuid) => dispatch(fetchUserFavorites(userUuid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReadingScreen);
