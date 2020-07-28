import React from 'react';
import {ImageBackground, StyleSheet, View, Image} from 'react-native';
import {Button, CheckBox, Layout, ViewPager, Text} from '@ui-kitten/components';
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


const SignInScreen = (props: any) => {
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


  const renderForm = (
    formProps: FormikProps<SignInData>,
  ): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id="email"
        style={styles.formControl}
        placeholder={i18n('auth.email')}
        keyboardType="email-address"
      />
      <FormInput
        id="password"
        style={styles.formControl}
        placeholder={i18n('auth.password')}
        secureTextEntry={!passwordVisible}
        icon={passwordVisible ? EyeIcon : EyeOffIcon}
        onIconPress={onPasswordIconPress}
      />
      <View style={styles.resetPasswordContainer}>
        <CheckBox
          style={styles.formControl}
          checked={shouldRemember}
          onChange={setShouldRemember}
          text={i18n('auth.remember_me')}
        />
        <Button
          appearance="ghost"
          status="basic"
          onPress={navigateResetPassword}>
          {i18n('auth.forgot_password')}
        </Button>
      </View>
      {/* <Button style={styles.submitButton} onPress={formProps.handleSubmit}>
        {i18n('auth.sign_in')}
      </Button> */}
      <LoginButton
        publishPermissions={['publish_actions', 'picture', 'email', 'friends', 'age_range']}
        onLoginFinished={onLoginFinished}
        onLogoutFinished={() => console.log('logout.')}
        style={styles.loginButton}
      />
    </React.Fragment>
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
      <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Layout
        style={styles.tab}
        level='2'>
        <Image style={styles.image} source={require('./../../assets/images/startup_1.jpg')} />
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Image style={styles.image} source={require('./../../assets/images/startup_2.jpg')} />
      </Layout>
      {/* <Layout
        style={styles.tab}
        level='2'>
        <Image style={styles.image} source={require('./../../assets/images/startup_3.jpg')} />
      </Layout> */}
      <Layout
        style={styles.tab}
        level='2'>
        <Image style={styles.image} source={require('./../../assets/images/startup_4.jpg')} />
      </Layout>
    </ViewPager>
      <View style={styles.bottomContainer}>
        <LoginButton
          publishPermissions={['publish_actions', 'picture', 'email', 'friends', 'age_range']}
          onLoginFinished={onLoginFinished}
          onLogoutFinished={() => console.log('logout.')}
          style={styles.loginButton}
        />
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
    width: '100%'
  },
  loginButton: { 
    width: '100%', 
    height: 48 
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 36,
    padding: 20,
  },
  tab: {
    height: '95%',
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
});

const mapStateToProps = state => {
  return {
    appData: state.appData,
    userData: state.user.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fbLogin: (params) => dispatch(loginUserFacebook(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);

// export default connect()(SignInScreen)
