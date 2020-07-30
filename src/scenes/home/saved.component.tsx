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
  Button,
  TopNavigation,
  TopNavigationAction } from '@ui-kitten/components';
// import { SavedScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBarLibrary } from '../../components/progress-bar.component';
import { SearchIcon, StarIcon, ArrowIosForwardIcon, PersonFillIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import { BookmarkIcon } from './../../assets/icons';

import { SOURCE } from '../../app/app-environment';
import {
  fetchUserFavorites,
  updateBookDetail,
  fetchBooksChapters,
  fetchUserFavorite,
} from '../../redux/actions';




const SavedScreen = (props: any): SafeAreaLayoutElement => {

  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);


  const { setBookDetail, fetchChapters, fetchFavorite, userData, favorites, getUserFavorites } = props;


  const navigateBookDetail = (bookIndex: number): void => {
    const {[bookIndex]: book} = favorites;
    setBookDetail(book);
    fetchChapters(book.uuid);
    fetchFavorite({userUuid: userData.uuid, bookUuid: book.uuid});
    props.navigation.navigate(AppRoute.BOOK_DETAIL);
  };

  const renderSaved = ({ item }: ListRenderItemInfo<any>): ListItemElement => {
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

  const onProfilePress = () => {
    props.navigation.navigate(AppRoute.PROFILE);
  };

  const renderProfileAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={PersonFillIcon}
      onPress={onProfilePress}
    />
  );

  const onRefresh = () => {
    getUserFavorites(userData.uuid);
  }

  return (
    <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    {/* <Toolbar
      title='Kon Seavpov'
      onBackPress={props.navigation.goBack}
    /> */}
    <TopNavigation
      title="Kon Seavpov"
      alignment="center"
      rightControls={[
        renderProfileAction(),
      ]}
    />
    <Divider/>
    <Layout style={styles.container} level='1'>
      <List
        style={styles.list}
        data={props.favorites}
        renderItem={renderSaved}
        ItemSeparatorComponent={Divider}
      />
      <Button onPress={onRefresh} appearance="ghost" status="success" textStyle={{fontSize: 15, lineHeight: 25}}>
        {props.intlData.messages['refresh']}
      </Button>
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
    width: '90%',
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
)(SavedScreen);
