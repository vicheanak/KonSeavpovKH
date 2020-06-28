import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions,
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
    bookDetail,
    hideTextSizeCard,
    bookReading,
  } = props;
  const styles = useStyleSheet(themedStyles);

  console.log('PROPS book-reading ==> ', bookReading);

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

  const totalChapterBars = (bookDetail.chapters.length * 100) / 100;
  console.log('bookDetail currentChapter ==>', props);
  let currentBar =
    (bookDetail.currentChapter.currentChapter.chapterNumber * 100) / totalChapterBars;

  let currentChapter = bookDetail.currentChapter.currentChapter.chapterNumber;
  let chapterIndex = currentChapter - 1;
  console.log({chapterIndex});
  const [selectedIndex, setSelectedIndex] = React.useState(chapterIndex);

  return (
    <View>
      <ViewPager
        selectedIndex={chapterIndex}
        onSelect={async (index) => {
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

          console.log('Props');
          // let currentChapterId = props.bookDetail.currentChapter.currentChapter.id.toString();
          // await TrackPlayer.skip(currentChapterId.toString());
          console.log({currentChapter});
          let matchingChapter = props.bookDetail.chapters.find((chapter) => {
            return chapter.chapterNumber == currentChapter; 
          });
          console.log({matchingChapter})
          setBookCurrentChapter({currentChapter: matchingChapter});
        }}>
        {bookDetail.chapters.map(chapter => {
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
      <ProgressBar
        style={styles.itemProgressBar}
        progress={currentBar}
        // text={`${3}%`}
        text="11"
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  mainContainer: {
    height: Dimensions.get('window').height - 70,
  },
  container: {
    backgroundColor: 'background-basic-color-2',
    height: Dimensions.get('window').height - 135,
  },
  itemProgressBar: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    marginVertical: 12,
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
