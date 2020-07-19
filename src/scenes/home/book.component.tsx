import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
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
  Card,
  Button,
  ListProps,
} from '@ui-kitten/components';
import {BookScreenProps} from '../../navigation/home.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {ProgressBar} from '../../components/progress-bar.component';
import {SearchIcon, BookmarkIcon} from '../../assets/icons';
import {Todo} from '../../data/todo.model';
import {i18n} from '../../app/i18n';
import {connect} from 'react-redux';
import {
  fetchData,
  updateLanguage,
  getBooksData,
  fetchBooksData,
  updateBookmarkBookDetail,
  updateBookDetail,
  fetchBooksChapters,
  updateBookCurrentChapter,
  fetchUserFavorite
} from '../../redux/actions';
import { SOURCE } from '../../app/app-environment';


const BookScreen = (props: any): ListElement => {
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);
  const [bookId, setBookId] = useState(0);

  const {fetchFavorite, setBookCurrentChapter, fetchChapters, setBookDetail, books, fetchBooks, ...listProps} = props;

  //  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // props.fetchPeople();
    // props.fetchBooks();
    (async () => {
      fetchBooks();
    })();
  }, [bookId]);

  const navigateBookDetail = (bookIndex: number): void => {
    const {[bookIndex]: book} = books;
    setBookDetail(book);
    fetchChapters(book.uuid);
    setBookCurrentChapter({currentChapter: book.chapters[0]});
    props.navigation.navigate(AppRoute.BOOK_DETAIL);
  };

  const renderItemHeader = ({
    item,
  }: ListRenderItemInfo<any>): React.ReactElement => {
    let photo = SOURCE + item.imageUrl;
    return (
      <View>
        <ImageBackground style={styles.itemHeader} source={{uri: photo}} />
        <Text numberOfLines={1} style={styles.authorName}>
          {item.authorname}
        </Text>
      </View>
    );
  };

  const renderBookList = (item: ListRenderItemInfo<any>): ListItemElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(item)}
      onPress={() => navigateBookDetail(item.index)}>
      <View style={styles.itemTitle}>
        <Text
          category="s1"
          style={styles.productTitle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.item.title}
        </Text>
        {/* <Button
          appearance="ghost"
          status="primary"
          style={styles.iconButton}
          icon={BookmarkIcon}
        /> */}
      </View>
      <Text category="c1" style={styles.productShortDescription}>
        {item.item.shortDescription}
      </Text>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['book_for_you']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={books}
        renderItem={renderBookList}
        {...listProps}
      />
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['trending_book']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={books}
        renderItem={renderBookList}
        {...listProps}
      />
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['new_book']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={books}
        renderItem={renderBookList}
        {...listProps}
      />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  hint: {
    margin: 16,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
  productItem: {
    flex: 1,
    margin: 5,
    width: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  authorName: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238,176,0,.4)',
    padding: 3,
    paddingLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginTop: 10,
  },
  productTitle: {
    marginHorizontal: -15,
    marginVertical: -10,
    fontWeight: 'bold',
    lineHeight: 20,
    height: 55,
    width: Dimensions.get('window').width / 2 - 80,
  },
  iconButton: {
    marginHorizontal: -20,
    marginTop: -15,
    height: 40,
    width: 40,
    backgroundColor: 'background-basic-color-1',
  },
  productShortDescription: {
    marginHorizontal: -15,
    marginVertical: 10,
    height: 30,
  },
  itemHeader: {
    height: 140,
  },
});

const mapStateToProps = state => {
  return {
    intlData: state.intlData,
    books: state.books.data,
    bookChapter: state.bookChapter,
    user: state.user.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLanguage: lang => dispatch(updateLanguage(lang)),
    fetchPeople: () => dispatch(fetchData()),
    fetchBooks: () => dispatch(fetchBooksData()),
    setBookDetail: (book) => dispatch(updateBookDetail(book)),
    fetchChapters: bookId => 
      dispatch(fetchBooksChapters(bookId)),
    setBookCurrentChapter: currentChapter =>
      dispatch(updateBookCurrentChapter(currentChapter)),
    fetchFavorite: (params) => dispatch(fetchUserFavorite(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookScreen);
