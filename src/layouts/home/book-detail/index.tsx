import React from 'react';
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

const product: Product = Product.centralParkApartment();

const ReadingIcon = (style): IconElement => (
  <Icon {...style} name="file-text-outline" />
);

const ListeningIcon = (style): IconElement => (
  <Icon {...style} name="volume-up-outline" />
);


const PauseIcon = (style): ImageStyle => (
  <Icon {...style} pack='app' name='pause'/>
)

const PlayIcon = (style): ImageStyle => (
  <Icon {...style} pack='app' name='play'/>
);


const ClockIcon = (style): IconElement => (
  <Icon {...style} name="clock-outline" />
);

const ListIcon = (style): IconElement => (
  <Icon {...style} name="list-outline" />
);

const SkipForwardIcon = (style): IconElement => (
  <Icon {...style} name='skip-forward-outline'/>
);

export default (props: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

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

  const [title, setTitle] = React.useState<string>('');
  const [artist, setArtist] = React.useState<string>('');
  const [artwork, setArtwork] = React.useState<string>('');
  const [bottomVisibility,setToolbarVisibility] = React.useState<boolean>(false);

  const onGoBackListener = async () => {
    console.log('Back to Book Detail Screen');
    const listeningState = await TrackPlayer.getState();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log({listeningState});
    const track = await TrackPlayer.getTrack(currentTrack);
    const {title, artist, artwork} = track || {};
    setTitle(title);
    setArtist(artist);
    setArtwork(artwork);
    setToolbarVisibility(true);
    console.log({title, artist, artwork});
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
    props.navigation.navigate(AppRoute.BOOK_LISTENING, {
      todo,
      onGoBack: () => onGoBackListener(),
    });
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
      <Text category="s1">Short description goes to very here</Text>
      {/* <View style={styles.detailsList}>
        {product.details.map(renderDetailItem)}
      </View> */}
      <View style={styles.optionList}>
        {product.options.map(renderOptionItem)}
      </View>
    </View>
  );

  const renderItemHeader = product => (
    <View>
      <ImageBackground
        style={styles.itemHeader}
        source={product.primaryImage}
      />
      <Text numberOfLines={1} style={styles.authorName}>
        Author Name is Very Long so Be Careful
      </Text>
    </View>
  );

  const playbackState = usePlaybackState();

  const onTogglePlayback = async () => {
    console.log({playbackState});
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.scrollViewContainer && bottomVisibility ? {marginBottom: 70} : {marginBottom: 0}]}>
        <ImageOverlay style={styles.image} source={product.primaryImage} />
        <View style={styles.headerContainer}>
          <Text style={styles.title} category="h4">
            {product.title}
          </Text>
          <Text style={styles.authorLabel} category="s2">
            Author Name
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
              READING
            </Button>
            <Button
              status="basic"
              icon={ListeningIcon}
              style={styles.bookButton}
              onPress={onListeningButtonPress}>
              LISTENING
            </Button>
          </ButtonGroup>
        </Card>
        <Text style={styles.sectionLabel} category="h6">
          About
        </Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.sectionLabel} category="h6">
          Who's it for?
        </Text>
        <View style={styles.description} appearance="hint">
          <View style={styles.whoText}>
            <Text>Anyone feeling stressed or overburdened</Text>
          </View>
          <View style={styles.whoText}>
            <Text>Psychology buffs looking for fresh insights</Text>
          </View>
          <View style={styles.whoText}>
            <Text>Mindfulness enthusiasts seeking a new angle</Text>
          </View>
        </View>
        <Text style={styles.sectionLabel} category="h6">
          About Author
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      {bottomVisibility && <View
        style={styles.cardContainer}>
          <Image style={styles.imageCard} source={{uri: artwork}} />
          <View style={styles.labelContainer}>
            <Text category="s1">{title}</Text>
            <Text appearance="hint" category="c1">
              {artist}
            </Text>
          </View>
          <View style={styles.mediaController}>
            <Button
              style={[styles.iconButton]}
              appearance="ghost"
              status="primary"
              icon={PlayIcon}
              onPress={onTogglePlayback}
            />
          </View>
      </View>}
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
    marginBottom: 80
  },
  labelContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
    width: Dimensions.get('window').width - 10
  },
  mediaController: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  iconButton: {
    paddingHorizontal: 0,
    // justifyContent: 'flex-end',
    width: 50
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
    shadowColor: "#000",
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
    height: 360
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
    marginHorizontal: 16,
    marginVertical: 8,
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
