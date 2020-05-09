import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Dimensions
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
  Divider
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {Product, ProductOption} from './extra/data';

const product: Product = Product.centralParkApartment();

const ReadingIcon = (style): IconElement => (
  <Icon {...style} name='file-text-outline'/>
);

const ListeningIcon = (style): IconElement => (
  <Icon {...style} name='volume-up-outline'/>
);

const ClockIcon = (style): IconElement => (
  <Icon {...style} name='clock-outline'/>
);

const ListIcon = (style): IconElement => (
  <Icon {...style} name='list-outline'/>
);

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onBookButtonPress = (): void => {};

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
    <Button
      key={index}
      style={styles.detailItem}
      status="basic"
      size="tiny">
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

  return (
    <ScrollView style={styles.container}>
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
       
       <ButtonGroup style={styles.buttonContainer} status='basic'>
           <Button status="basic" icon={ReadingIcon} style={styles.bookButton} onPress={onBookButtonPress}>
            READING
          </Button>
          <Button status="basic" icon={ListeningIcon} style={styles.bookButton} onPress={onBookButtonPress}>
            LISTENING
          </Button>
      </ButtonGroup>
       
        
      </Card>
      <Text style={styles.sectionLabel} category="h6">
        About
      </Text>
      <Text style={styles.description}>
        {product.description}
      </Text>
      <Text style={styles.sectionLabel} category="h6">
        Who's it for?
      </Text>
      <View style={styles.description} appearance="hint">
        <View style={styles.whoText}>
          <Text>
            Anyone feeling stressed or overburdened
          </Text>
        </View>
        <View style={styles.whoText}>
          <Text>
            Psychology buffs looking for fresh insights
          </Text>
        </View>
        <View style={styles.whoText}>
          <Text>
            Mindfulness enthusiasts seeking a new angle
          </Text>
        </View>
      </View>
      <Text style={styles.sectionLabel} category="h6">
        About Author
      </Text>
      <Text style={styles.description}>
        {product.description}
      </Text>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  whoText: {
    marginVertical: 10
  },
  title: {
    fontWeight: 'bold'
  },
  rentLabel: {
    marginTop: 24,
  },
  authorLabel: {
    marginTop: 8,
    fontWeight: 'bold'
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
    marginLeft: 15
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
    lineHeight: 25
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontWeight: 'bold'
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
