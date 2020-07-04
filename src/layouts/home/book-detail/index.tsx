import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  ButtonGroup,
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
  IconElement,
  Divider,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {Product, ProductOption} from './extra/data';
import {AppRoute} from '../../../navigation/app-routes';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {CloseIcon} from './../../../assets/icons';
import {SOURCE} from '../../../app/app-environment';
import {connect} from 'react-redux';
import { updateBookCurrentChapter } from './../../../redux/actions';

const product: Product = Product.centralParkApartment();

const ReadingIcon = (style): IconElement => (
  <Icon {...style} name="file-text-outline" />
);

const ListeningIcon = (style): IconElement => (
  <Icon {...style} name="volume-up-outline" />
);


export default (props: any): React.ReactElement => {
// const BookDetailLayout = (props: any): React.ReactElement => {
  // export default (props: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const {book} = props.bookDetail;
  const {bookChapter} = props;

  useEffect(() => {
    (async () => {
    })();
  }, []);

  const onReadingButtonPress = (): void => {
    props.setPlayerVisibility(false);
    let matchingChapter = bookChapter.chapters.find((chapter) => {
      return chapter.chapterNumber == 1; 
    });
    props.setBookCurrentChapter({currentChapter: matchingChapter});
    props.navigation.navigate(AppRoute.BOOK_READING);
  };

  const [title, setTitle] = React.useState<string>('');
  const [artist, setArtist] = React.useState<string>('');
  const [artwork, setArtwork] = React.useState<string>('');
  // const [bottomVisibility, setToolbarVisibility] = React.useState<boolean>(
  //   false,
  // );

  const onComeBack = async () => {
    // const listeningState = await TrackPlayer.getState();
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // const track = await TrackPlayer.getTrack(currentTrack);
    // const {title, artist, artwork} = track || {};
    // setTitle(title);
    // setArtist(artist);
    // setArtwork(artwork);
    // setToolbarVisibility(true);
  };

  const onListeningButtonPress = (): void => {
    props.setPlayerVisibility(false);
    props.navigation.navigate(AppRoute.BOOK_LISTENING);
    // props.navigation.navigate(AppRoute.BOOK_LISTENING, {
    //   onGoBack: () => onComeBack(),
    // });
  };

  const renderOptionItemIcon = (
    style: ImageStyle,
    icon: string,
  ): React.ReactElement => <Icon {...style} name={icon} />;

  const renderOptionItem = (
    option: ProductOption,
    index: number,
  ): React.ReactElement => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance="ghost"
      status="basic"
      icon={(style: ImageStyle) => renderOptionItemIcon(style, option.icon)}>
      {option.title}
    </Button>
  );

  const renderDetailItem = (
    detail: string,
    index: number,
  ): React.ReactElement => (
    <Button key={index} style={styles.detailItem} status="basic" size="tiny">
      {detail}
    </Button>
  );

  const renderBookingFooter = (): React.ReactElement => (
    <View>
      <Text category="s1">{book.shortDescription}</Text>
      {/* <View style={styles.detailsList}>
        {product.details.map(renderDetailItem)}
      </View> */}
      <View style={styles.optionList}>
        <Button
          key="duration"
          style={styles.optionItem}
          appearance="ghost"
          status="basic"
          icon={(style: ImageStyle) => renderOptionItemIcon(style, 'clock')}>
          {book.durationMinutes.toString()} {props.intlData.messages['minutes']}
        </Button>
        <Button
          key="chapters"
          style={styles.optionItem}
          appearance="ghost"
          status="basic"
          icon={(style: ImageStyle) => renderOptionItemIcon(style, 'list')}>
          {book.totalChapters.toString()} {props.intlData.messages['chapters']}
        </Button>
        {/* {product.options.map(renderOptionItem)} */}
      </View>
    </View>
  );

  const renderItemHeader = product => {
    let photo = SOURCE + book.imageUrl;
    return (
      <View>
        {/* <ImageBackground style={styles.itemHeader} source={{uri: photo}} /> */}
        <Text numberOfLines={1} style={styles.authorName}>
          Author Name is Very Long so Be Careful
        </Text>
      </View>
    );
  };

  const playbackState = usePlaybackState();
  const [playPauseIcon, setPlayPauseIcon] = React.useState<string>('pause');

  const PlayPauseIcon = (style): ImageStyle => (
    <Icon {...style} pack="app" name={playPauseIcon} />
  );

  const onTogglePlayback = async () => {
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      setPlayPauseIcon('pause');
      await TrackPlayer.play();
    } else {
      setPlayPauseIcon('play');
      await TrackPlayer.pause();
    }
  };

  let imageUrl = SOURCE + book.imageUrl;

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.scrollViewContainer && bookChapter.playerVisibility
            ? {marginBottom: 70}
            : {marginBottom: 0},
        ]}>
        <ImageOverlay style={styles.image} source={{uri: imageUrl}} />
        <View style={styles.headerContainer}>
          <Text style={styles.title} category="h4">
            {book.title}
          </Text>
          <Text style={styles.authorLabel} category="s2">
            {book.authorname}
          </Text>
        </View>
        <Card
          style={styles.bookingCard}
          appearance="filled"
          disabled={true}
          footer={renderBookingFooter}>
          <ButtonGroup style={styles.buttonContainer} status="basic">
            <Button
              status="basic"
              icon={ReadingIcon}
              style={styles.bookButton}
              onPress={onReadingButtonPress}>
                {props.intlData.messages['reading']}
            </Button>
            <Button
              status="basic"
              icon={ListeningIcon}
              style={styles.bookButton}
              onPress={onListeningButtonPress}>
                {props.intlData.messages['listening']}
            </Button>
          </ButtonGroup>
        </Card>
        <Text style={styles.sectionLabel} category="h6">
          {props.intlData.messages['about']}
        </Text>
        <Text style={styles.description}>{book.aboutBook}</Text>
        <Text style={styles.sectionLabel} category="h6">
          {props.intlData.messages['who_for']}
        </Text>
        <Text style={styles.description}>{book.whoFor}</Text>
        <Text style={styles.sectionLabel} category="h6">
          {props.intlData.messages['about_author']}
        </Text>
        <Text style={styles.description}>{book.aboutAuthor}</Text>
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    flex: 1,
  },
  scrollViewContainer: {
    backgroundColor: 'background-basic-color-2',
    marginBottom: 80,
  },
  labelContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
    width: Dimensions.get('window').width - 10,
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 0,
    // justifyContent: 'flex-end',
    width: 50,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    backgroundColor: 'background-basic-color-2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  itemHeader: {
    height: 140,
  },
  authorName: {
    position: 'absolute',
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
  productItem: {
    position: 'absolute',
    bottom: 1,
    margin: 5,
    width: Dimensions.get('window').width - 24,
    backgroundColor: 'background-basic-color-1',
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
  image: {
    height: 360,
  },
  imageCard: {
    width: 70,
    height: 70,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  whoText: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  bookButton: {
    width: 150,
  },
  headerContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 8,
    position: 'absolute',
    top: Dimensions.get('window').height / 5,
  },
  buttonContainer: {
    width: 300,
    borderRadius: 30,
    justifyContent: 'center',
    marginLeft: 15,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
    lineHeight: 25,
  },
  sectionLabel: {
    marginHorizontal: 30,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
