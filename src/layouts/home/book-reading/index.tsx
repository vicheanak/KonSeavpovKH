import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions,
  Animated,
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
  ViewPager,
  Layout,
} from '@ui-kitten/components';
import {Product, ProductOption} from './extra/data';
import {ProgressBar} from '../../../components/progress-bar.component';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import TrackPlayer from 'react-native-track-player';

const product: Product = Product.centralParkApartment();

const ReadingIcon = (style): IconElement => (
  <Icon {...style} name="file-text-outline" />
);

const ListeningIcon = (style): IconElement => (
  <Icon {...style} name="volume-up-outline" />
);

const ClockIcon = (style): IconElement => (
  <Icon {...style} name="clock-outline" />
);

const ListIcon = (style): IconElement => (
  <Icon {...style} name="list-outline" />
);

export default (props: any): React.ReactElement => {
  const {
    setBookCurrentChapter,
    bookChapter,
    bookDetail,
    hideTextSizeCard,
    bookReading,
  } = props;
  const styles = useStyleSheet(themedStyles);


  const onBookButtonPress = (): void => {};

  // const renderImageItem = (
  //   info: ListRenderItemInfo<ImageSourcePropType>,
  // ): React.ReactElement => (
  //   <Image style={styles.imageItem} source={info.item} />
  // );

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
      <View style={styles.optionList}>
        {product.options.map(renderOptionItem)}
      </View>
    </View>
  );

  let fadeAnim = useRef(new Animated.Value(0)).current;
  let windowWidth = Dimensions.get('window').width * currentBar / 100;

  const onViewSelected = async () => {
    fadeInText();
    // changeWidth();
    setTimeout(() => {
      fadeOutText();
    }, 4000);
  };

  const fadeInText = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const fadeOutText = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };
  const totalChapterBars = (bookChapter.chapters.length * 100) / 100;
  let currentBar =
    (bookChapter.currentChapter.currentChapter.chapterNumber * 100) /
    totalChapterBars;
  let currentChapter = bookChapter.currentChapter.currentChapter.chapterNumber;
  let chapterIndex = currentChapter - 1;
  const [selectedIndex, setSelectedIndex] = React.useState(chapterIndex);

  return (
    <View style={styles.mainContainer}>
      <ViewPager
        selectedIndex={chapterIndex}
        onSelect={async index => {
          onViewSelected();
          if (index > chapterIndex) {
            //nextChapter
            currentBar = currentBar + currentBar;
            currentChapter++;
          }
          if (index < chapterIndex) {
            //previousChapter
            currentBar = currentBar - currentBar;
            currentChapter--;
          }
          hideTextSizeCard();

          let matchingChapter = bookChapter.chapters.find(chapter => {
            return chapter.chapterNumber == currentChapter;
          });
          setBookCurrentChapter({currentChapter: matchingChapter});
          const currentTrack = await TrackPlayer.getCurrentTrack();
          if (currentTrack){
            await TrackPlayer.skip(matchingChapter.id.toString());
          }
        }}>
        {bookChapter.chapters.map(chapter => {
          return (
            <ScrollView key={chapter.id} style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.title} category="h4">
                  {chapter.title}
                </Text>
                <Text style={styles.authorLabel} category="s2">
                  {bookDetail.book.authorname}
                </Text>
              </View>

              <View style={styles.description}>
                <SelectableText
                  selectable={true}
                  menuItems={['Highlight', 'Copy', 'Share']}
                  onSelection={({
                    eventType,
                    content,
                    selectionStart,
                    selectionEnd,
                  }) => {
                    if (eventType == 'Highlight') {
                      console.log('highlight', content);
                    }
                    if (eventType == 'Copy') {
                      console.log('copy', content);
                    }
                    if (eventType == 'Share') {
                      console.log('share', content);
                    }
                    console.log({
                      eventType,
                      content,
                      selectionStart,
                      selectionEnd,
                    });
                  }}
                  style={[styles.descriptionText, {fontSize: props.textSize}]}
                  value={chapter.content}
                />
              </View>
            </ScrollView>
          );
        })}
      </ViewPager>
      <View style={styles.bottom}>
        <ProgressBar
          style={styles.itemProgressBar}
          progress={currentBar}
          // text={`${3}%`}
          text={currentChapter}
          fadeAnim={fadeAnim}
        />
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  container: {
    // backgroundColor: 'background-basic-color-2',
    // height: Dimensions.get('window').height - 100,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  itemProgressBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // marginVertical: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 45,
    color: 'text-basic-color',
  },
  image: {
    height: 360,
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
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  bookButton: {
    width: 150,
  },
  headerContainer: {
    // flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 8,
    // position: 'absolute',
    // top: Dimensions.get('window').height / 5,
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
  tab: {
    // height: Dimensions.get('window').height,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
