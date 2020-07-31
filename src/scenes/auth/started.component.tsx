import React from 'react';
import {ImageBackground, StyleSheet, View, Image} from 'react-native';
import {
  Button,
  CheckBox,
  Layout,
  ViewPager,
  Text,
  ButtonGroup,
} from '@ui-kitten/components';
import {Formik, FormikProps} from 'formik';
import {SignInScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {FormInput} from '../../components/form-input.component';
import {EyeIcon, EyeOffIcon} from '../../assets/icons';
import {SignInData, SignInSchema} from '../../data/sign-in.model';
import {i18n} from '../../app/i18n';
import {connect} from 'react-redux';
import {loginUserFacebook} from '../../redux/actions';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

const StartedScreen = (props: any) => {
  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  // props.fetchData();

  const onFormSubmit = (values: SignInData): void => {
    navigateHome();
  };

  const navigateHome = (): void => {
    props.navigation.navigate(AppRoute.HOME);
  };

  const navigateSignUp = (): void => {
    props.navigation.navigate(AppRoute.SIGN_UP);
  };

  const navigateResetPassword = (): void => {
    props.navigation.navigate(AppRoute.RESET_PASSWORD);
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  //Create response callback.

  const onLoginFinished = (error, result) => {
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        const _responseInfoCallback = (error: any, result: any) => {
          if (error) {
            console.log('Error fetching data: ', error);
          } else {
            let params = result;
            params.accessToken = data.accessToken;
            props.fbLogin(params);
            props.navigation.navigate(AppRoute.HOME);
          }
        };
        const infoRequest = new GraphRequest(
          '/me?fields=name,picture,email,friends,age_range',
          {
            parameters: {
              fields: {
                string: 'id,name,email,friends,age_range,picture.type(large)',
              },
            },
          },
          _responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaLayout style={styles.safeArea} insets={[SaveAreaInset.TOP, SaveAreaInset.BOTTOM]}>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Layout style={styles.tab} level="2">
          <Image
            style={styles.image}
            source={require('./../../assets/images/startup_1.png')}
          />
        </Layout>
        <Layout style={styles.tab} level="2">
          <Image
            style={styles.image}
            source={require('./../../assets/images/startup_2.png')}
          />
        </Layout>
        {/* <Layout
        style={styles.tab}
        level='2'>
        <Image style={styles.image} source={require('./../../assets/images/startup_3.jpg')} />
      </Layout> */}
        <Layout style={styles.tab} level="2">
          <Image
            style={styles.image}
            source={require('./../../assets/images/startup_4.png')}
          />
        </Layout>
      </ViewPager>
      <View style={styles.bottomContainer}>
        <Button
            onPress={() => {
            props.navigation.navigate(AppRoute.SIGN_IN);
            }}
            status="info"
            appearance="outline"
            textStyle={{fontSize: 17, lineHeight: 25}}
            style={styles.bookButton}>
                Get Started
        </Button>
        <Button
            onPress={() => {
            props.navigation.navigate(AppRoute.SIGN_IN);
            }}
            status="success"
            textStyle={{fontSize: 17, lineHeight: 25}}
            style={styles.bookButton}>
                Sign In
        </Button>
        {/* <ButtonGroup status={'success'} style={styles.buttonContainer}>
          <Button
            style={styles.bookButton}
            textStyle={{fontSize: 17, lineHeight: 30}}>
            {props.intlData.messages['get_started']}
          </Button>
          <Button
            style={styles.bookButton}
            textStyle={{fontSize: 17, lineHeight: 30}}>
            {props.intlData.messages['sign_in']}
          </Button>
        </ButtonGroup> */}
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  loginButton: {
    width: '100%',
    height: 48,
    position: 'absolute',
    bottom: 60,
  },
  tab: {
    // height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    height: 192,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  bookButton: {
    width: '40%',
    borderRadius: 50,
    marginHorizontal: 10,
    height: 50
  },
  bottomContainer: {
    flex: 1,
    // position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    // height: 50,
    // width: '40%',
    // borderRadius: 50,
    // lineHeight: 80,
    // marginHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return {
    intlData: state.intlData,
    appData: state.appData,
    userData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fbLogin: params => dispatch(loginUserFacebook(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartedScreen);