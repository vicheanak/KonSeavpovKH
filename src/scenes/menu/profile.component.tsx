import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
import {updatePricingModalVisibility} from '../../redux/actions';
import moment from "moment";

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const ProfileScreen = (props: any): SafeAreaLayoutElement => {

  const { userData, invoice } = props;
  useEffect(() => {
  }, []);
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
    marginLeft: 10
  },
  bookButton: {
    // width: 250,
    // padding: 90
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
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
    setPricingModalVisibility: (isVisible) => dispatch(updatePricingModalVisibility(isVisible))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);