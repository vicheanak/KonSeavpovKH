import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Linking} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  Avatar
} from '@ui-kitten/components';
import {Toolbar} from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {AppRoute} from '../../navigation/app-routes';
import {connect} from 'react-redux';
import {updatePricingModalVisibility, updateLanguage} from '../../redux/actions';
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const ProfileScreen = (props: any): SafeAreaLayoutElement => {

  const { userData, invoice } = props;
  useEffect(() => {
  }, []);
  const openFacebookUrl = async () => {
    const facebookPage = "fb://page/111874160485392";
    const facebookPageWebsite = "https://www.facebook.com/111874160485392";
    const supported = await Linking.canOpenURL(facebookPage);

    if (supported) {
      await Linking.openURL(facebookPage);
    } else {
      await Linking.openURL(facebookPageWebsite);
    }
  }
  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title="Profile" onBackPress={props.navigation.goBack} />
      <Divider />
      <Layout style={styles.container}>
        {/* <List style={styles.listContainer} data={data} renderItem={renderItem} /> */}
        <View style={styles.rowContainer}>
            <Avatar style={styles.avatar} size='giant' source={{ uri: userData.picture }}/>
            <Text>{userData.name}</Text>
        </View>
        <Divider/>
        <View style={styles.rowContainer}>
          <Text status="info" style={styles.rowLabel}>
            {props.intlData.messages['membership']}
          </Text>
        </View>
        {invoice.length > 0 && moment() >= moment(parseInt(props.invoice[0]?.endSubscriptionDate)) && (<View style={styles.rowContainer}>
            <Text style={styles.rowLabel}>{props.intlData.messages['membership']}: {props.intlData.messages['expired']}</Text>
        </View>)}
        {invoice.length > 0 && moment() < moment(parseInt(props.invoice[0]?.endSubscriptionDate)) && (<View style={styles.rowContainer}>
            <Text style={styles.rowLabel}>{props.intlData.messages['membership']}: {props.invoice[0]?.membership.name}</Text>
        </View>)}
        {Object.keys(props.invoice).length === 0 && (<View style={styles.rowContainer}>
            <Text style={styles.rowLabel}>{props.intlData.messages['membership']}: {props.intlData.messages['not_yet_join']}</Text>
        </View>)}
        <Divider/>
        {invoice.length > 0 && (<View style={styles.rowContainer}>
        <Text style={styles.rowLabel}>{props.intlData.messages['expired']}: {moment(parseInt(props.invoice[0]?.endSubscriptionDate)).format('L')}</Text>
        </View>)}
        {invoice.length > 0 && moment() >= moment(parseInt(props.invoice[0]?.endSubscriptionDate)) && (<View>
          <Button
          status="success"
          appearance="ghost"
          style={styles.bookButton}
          textStyle={{fontSize: 17, lineHeight: 30}}
          onPress={() => props.setPricingModalVisibility(true)}>
          {props.intlData.messages['join_membership']}
          </Button>
        </View>)}
        {Object.keys(props.invoice).length === 0 && (<View>
          <Button
          status="success"
          appearance="ghost"
          style={styles.bookButton}
          textStyle={{fontSize: 17, lineHeight: 30}}
          onPress={() => props.setPricingModalVisibility(true)}>
          {props.intlData.messages['join_membership']}
          </Button>
        </View>)}
        <Divider/>
        <View style={styles.rowContainer}>
          <Text status="info" style={styles.rowLabel}>
            {props.intlData.messages['language']}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {props.updateLanguage('kh')}} style={styles.rowContainer}>
          <Avatar style={styles.avatar} size='medium' source={require('./../../assets/images/khmer_flag.png')}/>
          <Text style={[styles.rowLabel]}>
            {props.intlData.messages['khmer']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.updateLanguage('en')}} style={styles.rowContainer}>
          <Avatar style={styles.avatar} size='medium' source={require('./../../assets/images/english_flag.png')}/>
          <Text style={[styles.rowLabel]}>
            {props.intlData.messages['english']}
          </Text>
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          <Text status="info" style={styles.rowLabel}>
            {props.intlData.messages['others']}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {props.navigation.navigate(AppRoute.TERMS_OF_SERVICES)}} style={styles.rowContainer}>
          <Text style={[styles.rowLabel]}>
            {props.intlData.messages['terms_of_services']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {props.navigation.navigate(AppRoute.PRIVACY_POLICY)}} style={styles.rowContainer}>
          <Text style={[styles.rowLabel]}>
            {props.intlData.messages['privacy_policy']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openFacebookUrl} style={styles.rowContainer}>
          <Text style={[styles.rowLabel]}>
            {props.intlData.messages['follow_us_facebook']}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <LoginButton
            publishPermissions={['publish_actions', 'picture', 'email', 'friends', 'age_range']}
            onLogoutFinished={() => {
              props.navigation.navigate(AppRoute.AUTH);
            }}
            style={styles.loginButton}
          />
        </View>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loginButton: { 
    width: '100%', 
    height: 48 
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  rowLabel: {
    marginLeft: 10,
    alignSelf: 'center'
  },
  image: {
    height: 30,
    width: 30
  },
  bookButton: {
    // width: 250,
    // padding: 90
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 5,
  },
  avatar: {
    margin: 8,
  },
  listContainer: {
    // maxHeight: 192,
    height: '100%'
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
    isPricingModalVisible: state.user.isPricingModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPricingModalVisibility: (isVisible) => dispatch(updatePricingModalVisibility(isVisible)),
    updateLanguage: (lang) => dispatch(updateLanguage(lang))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);