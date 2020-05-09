import React from 'react';
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
  const styles = useStyleSheet(themedStyles);

  console.log('BOOK_READING Layout', {props});

  const onBookButtonPress = (): void => {};
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderImageItem = (
    info: ListRenderItemInfo<ImageSourcePropType>,
  ): React.ReactElement => (
    <Image style={styles.imageItem} source={info.item} />
  );

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

  const totalChapterBars = (props.totalChapters.totalChapters * 100) / 100;
  let currentBar =
    (props.currentChapter.currentChapter * 100) / totalChapterBars;
  console.log({currentBar, totalChapterBars});
  let currentChapter = props.currentChapter.currentChapter;

  return (
    // <View style={styles.mainContainer}>
    <View>
      {/* <ScrollView style={styles.container}> */}
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={index => {
            if (index > selectedIndex) {
              //nextChapter
              currentBar = currentBar + currentBar;
              currentChapter++;
            }
            if (index < selectedIndex) {
              //previousChapter
              currentBar = currentBar - currentBar;
              currentChapter--;
            }
            props.setBookCurrentChapter({currentChapter: currentChapter});
            setSelectedIndex(index);
          }}>
          {/* <Layout level="2"> */}
            <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title} category="h4">
                Chapter 1
              </Text>
              <Text style={styles.authorLabel} category="s2">
                Author Name
              </Text>
            </View>

            <Text style={styles.sectionLabel} category="h6">
              About
            </Text>

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
                style={styles.descriptionText}
                value={product.description}
              />
            </View>
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
          {/* </Layout> */}
          {/* <Layout level="2"> */}
            <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title} category="h4">
                Chapter 2
              </Text>
              <Text style={styles.authorLabel} category="s2">
                Author Name
              </Text>
            </View>

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
          {/* </Layout> */}
          {/* <Layout level="2"> */}
            <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.title} category="h4">
                Chapter 3
              </Text>
              <Text style={styles.authorLabel} category="s2">
                Author Name
              </Text>
            </View>

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
          {/* </Layout> */}
        </ViewPager>
      {/* </ScrollView> */}
      <ProgressBar
        style={styles.itemProgressBar}
        progress={currentBar}
        text={`${3}%`}
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  mainContainer: {
    height: Dimensions.get('window').height - 70
  },
  container: {
    backgroundColor: 'background-basic-color-2',
    height: Dimensions.get('window').height - 135
  },
  itemProgressBar: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    marginVertical: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 25,
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
