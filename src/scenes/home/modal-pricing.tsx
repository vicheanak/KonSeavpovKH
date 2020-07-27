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
  Alert,
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

export default (props: any): React.ReactElement => {
  const [subscribeModalVisible, setSubscribeModalVisible] = React.useState(
    false,
  );
  const [viewPlanModalVisible, setViewPlanModalVisible] = React.useState(false);
  const styles = useStyleSheet(themedStyles);

  const checkData = [{
    title: 'ស្តាប់ជាសម្លេង ឬអានជាអក្សរ',
  },{
    title: 'សៀវភៅល្បីៗជាង​ ១០០ក្បាល',
  },{
    title: 'សៀវភៅថ្មីៗរៀងរាល់សប្តាហ៍',
  }];

  const yearlyUrl = "http://m.me/111874160485392?ref=yearly";

  const monthlyUrl = "http://m.me/111874160485392?ref=monthly";

  const onYearlyCardPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(yearlyUrl);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(yearlyUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${yearlyUrl}`);
    }
  }, [yearlyUrl]);


  const onMonthlyCardPress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    try{
      const supported = await Linking.canOpenURL(monthlyUrl);
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(monthlyUrl);
      } else {
        Alert.alert(`Don't know how to open this URL: ${monthlyUrl}`);
      }
    }catch (err){
        Alert.alert(`Don't know how to open this URL: ${monthlyUrl}`);
    }

  }, [monthlyUrl]);

  const renderItemIcon = (props) => (
    <Icon {...props} name='checkmark-outline'/>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      titleStyle={{fontSize: 15}}
      icon={renderItemIcon}
    />
  );

  return (
    <View>
      <Modal
        visible={props.isPricingModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => props.setPricingModalVisibility(false)}>
        <Card style={styles.cardModal} disabled={true}>
          <Image
            style={styles.imageModal}
            source={require('./../../assets/images/modal_popup1.jpg')}
          />
          {/* <Image style={styles.image} source={require('./../../assets/images/startup_1.jpg')} /> */}
          <Text category="s1" style={styles.labelModal}>
            បញ្ចុះតំលៃ 50% ក្នុងខែនេះ
          </Text>
          <Text category="s1" style={styles.labelModal}>
            ពី $9.9/ខែ សល់ត្រឹម $4.95/ខែ
          </Text>
          <Button
            onPress={onMonthlyCardPress}
            status="success"
            style={styles.subscribeButtonModal}
            textStyle={{fontSize: 17, lineHeight: 35}}>
            ចូលជាសមាជិក
          </Button>
          <Button
            appearance="ghost"
            onPress={() => setViewPlanModalVisible(true)}
            status="success"
            style={styles.allPlanButtonModal}
            textStyle={{fontSize: 15, lineHeight: 25}}>
            តារាងតំលៃ
          </Button>
        </Card>
      </Modal>
      <Modal
        visible={viewPlanModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setViewPlanModalVisible(false)}>
        <Card
          style={styles.allPlanCardModal}
          status={'primary'}
          disabled={true}>
          <Text
            category="s1"
            style={[{color: 'green'}, styles.allPlanLabelModal]}>
            ចុះឈ្មោះជាសមាជិក​ក្នុងខែនេះ អ្នកនឹងទទួលបានការចុះតំលៃ​ 50%!
          </Text>
          <List
            style={styles.checkContainer}
            data={checkData}
            renderItem={renderItem}
          />
          <Card style={styles.priceCardModal} onPress={onYearlyCardPress}>
            <Text status="basic" category="h6">
              Diamond
            </Text>
            <Text status="primary" category="h6">
              $29.70/ឆ្នាំ
            </Text>
            <Text status="basic" category="p1">
              សុពលភាពរយះពេល 1ឆ្នាំ
            </Text>
          </Card>
          <Card style={styles.priceCardModal} onPress={onMonthlyCardPress}>
            <Text status="basic" category="h6">
              Gold
            </Text>
            <Text status="primary" category="h6">
              $4.95/ខែ
            </Text>
            <Text status="basic" category="p1">
              សុពលភាពរយះពេល 1ខែ
            </Text>
          </Card>
        </Card>
      </Modal>
    </View>
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
  backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});