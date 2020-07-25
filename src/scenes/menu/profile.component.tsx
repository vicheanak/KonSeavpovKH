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
import {fetchData} from '../../redux/actions';

const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const ProfileScreen = (props: any): SafeAreaLayoutElement => {

  useEffect(() => {
    console.log({props});
  }, []);
  return (
    <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
      <Toolbar title="Profile" onBackPress={props.navigation.goBack} />
      <Divider />
      <Layout style={styles.container}>
        {/* <List style={styles.listContainer} data={data} renderItem={renderItem} /> */}
        <View style={styles.rowContainer}>
            <Avatar style={styles.avatar} size='giant' source={{ uri: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1005836986555487&height=200&width=200&ext=1597997083&hash=AeSlKRpDkQuyhRKQ' }}/>
            <Text>Pu Den</Text>
        </View>
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
    user: state.user.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);