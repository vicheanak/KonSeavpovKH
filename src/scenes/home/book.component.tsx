import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
  Image,
  ImageStyle,
  Linking,
  Alert
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
  Modal,
  Icon,
  IconElement,
} from '@ui-kitten/components';
import {BookScreenProps} from '../../navigation/home.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {ProgressBar} from '../../components/progress-bar.component';
import {SearchIcon, BookmarkIcon, LockIcon} from '../../assets/icons';
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
  fetchUserFavorite,
  updateUserData,
  getUserLatestInvoice,
  updatePricingModalVisibility
} from '../../redux/actions';
import { SOURCE } from '../../app/app-environment';
import {AppStorage} from './../../services/app-storage.service';
import moment from "moment";
import ModalPricingView from './modal-pricing';

const BookScreen = (props: any): ListElement => {
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);
  const [bookId, setBookId] = useState(0);

  const {updateViewPricingModal, getLatestInvoice, setUserData, userData, fetchFavorite, fetchChapters, setBookDetail, books, fetchBooks, ...listProps} = props;

  //  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // props.fetchPeople();
    // props.fetchBooks();
    (async () => {
      let userLocalData:any = {};
      if (userData.uuid){
        userLocalData = userData;
        AppStorage.setUser(JSON.stringify(userData));
        setUserData(userData);
      }else{
        const userDataStorage = await AppStorage.getUser();
        userLocalData = JSON.parse(userDataStorage);
        setUserData(userLocalData);
      }
      getLatestInvoice(userLocalData?.uuid);
      fetchBooks();
    })();
  }, []);

  const navigateBookDetail = (bookIndex: number): void => {
    const {[bookIndex]: book} = books;
    setBookDetail(book);
    fetchChapters(book.uuid);
    fetchFavorite({userUuid: userData.uuid, bookUuid: book.uuid});
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


  const setPricingModal = (isVisible) => {
    props.setPricingModalVisibility(isVisible);
  }

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
          {/* {item.item.title} */}
          សួស្តីឆ្នាំថ្មី ខ្ញុំស្រលាញ់វត្តអារាម
        </Text>
        {props.invoice.length && <Button
          appearance="ghost"
          status="danger"
          style={styles.iconButton}
          icon={LockIcon}
          onPress={() => setPricingModal(true)}
        />}
        {props.invoice.length && moment() > moment(parseInt(props.invoice[0]?.endSubscriptionDate)) && <Button
          appearance="ghost"
          status="danger"
          style={styles.iconButton}
          icon={LockIcon}
          onPress={() => setPricingModal(true)}
        />}
      </View>
      <Text category="c1" style={styles.productShortDescription}>
        {/* {item.item.shortDescription} */}
        អារម្មណ៍ស្រស់ស្រាយ ជាទីមនោរម្យ
      </Text>
    </Card>
  );

  const renderOptionItemIcon = (
    style: ImageStyle,
    icon: string,
  ): React.ReactElement => <Icon {...style} name={icon} />;

  const CheckIcon = (style): IconElement => (
    <Icon {...style} name="checkmark-outline" />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.labelHeader} category="h6">
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
      <Text style={styles.labelHeader} category="h6">
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
      <Text style={styles.labelHeader} category="h6">
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
      <ModalPricingView {...props} />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  checkContainer: {
    // height: 192,
  },
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  priceCardModal: {
    marginVertical: 5,
    backgroundColor: '#e6edf9'
  },
  checkButtonModal: {
    padding: 0,
    width: '80%'
  },
  allPlanButtonModal: {
    height: 50,
    fontSize: 30,
  },
  subscribeButtonModal: {
    marginTop: 10,
    lineHeight: 30,
    fontSize: 30,
    padding: 20
  },
  checkLabelModal: {
    fontSize: 14,
    lineHeight: 25,
    marginVertical: 10
  },
  allPlanLabelModal: {
    fontSize: 17,
    lineHeight: 30,
    marginVertical: 10
  },
  labelModal: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 30
  },
  allPlanCardModal: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height - 370,
    flex: 1,
    // justifyContent: 'center',
  },
  cardModal: {
    width: 300,
    // height: 300,
    flex: 1,
    justifyContent: 'center',
  },
  imageModal: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  labelHeader: {
    margin: 16,
    color: 'color-primary-700'
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
    // lineHeight: 25,
    height: 50,
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
  backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const mapStateToProps = state => {
  return {
    intlData: state.intlData,
    books: state.books.data,
    bookChapter: state.bookChapter,
    user: state.user.favorites,
    userData: state.user.userData,
    invoice: state.user.invoice,
    isPricingModalVisible: state.user.isPricingModalVisible
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
    fetchFavorite: (params) => dispatch(fetchUserFavorite(params)),
    setUserData: (params) => dispatch(updateUserData(params)),
    getLatestInvoice: (userUuid) => dispatch(getUserLatestInvoice(userUuid)),
    setPricingModalVisibility: (isVisible) => dispatch(updatePricingModalVisibility(isVisible))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookScreen);
