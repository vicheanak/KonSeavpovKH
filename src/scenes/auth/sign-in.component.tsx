import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Layout, ViewPager, Text} from '@ui-kitten/components';
import {Formik, FormikProps} from 'formik';
import {SignInScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {FormInput} from '../../components/form-input.component';
import {EyeIcon, EyeOffIcon} from '../../assets/icons';
import {SignInData, SignInSchema} from '../../data/sign-in.model';
import {i18n} from '../../app/i18n';
import {connect} from 'react-redux';
import {fetchData} from '../../redux/actions';
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
        console.log({data});
        const _responseInfoCallback = (error: any, result: any) => {
          if (error) {
            console.log('Error fetching data: ', error);
          } else {
            console.log('Success fetching data: ', result);
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

  const onAccessToken = () => {
    console.log('Access Token');
    AccessToken.getCurrentAccessToken().then(data => {
      console.log({data});
      if (data){
        const _responseInfoCallback = (error: any, result: any) => {
          if (error) {
            console.log('Error fetching data: ', error);
          } else {
            console.log('Success fetching data: ', result);
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
      }
    });
  }

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
      <Button style={styles.submitButton} onPress={onAccessToken}>
        Get Accesstoken
      </Button>
      <LoginButton
        style={styles.loginButton}
        publishPermissions={['publish_actions', 'picture', 'email', 'friends', 'age_range']}
        onLoginFinished={onLoginFinished}
        onLogoutFinished={() => console.log('logout.')}
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
        <Text category='h5'>ចុះពី $6/ខែ សល់ត្រឹម $3/ខែ​ លោកអ្នកអាចអានអក្សរ និងស្តាប់សម្លេង ក្នុងសៀវភៅដែលលក់ដាច់ជាងគេបំផុតលេីសកលលោក ជាភាសាខ្មែរ ចំនួន​រាប់រយក្បាល</Text>
        {/* <Text category='h5'>ជាភាសាខ្មែរ</Text>
        <Text category='h5'>ចំនួន​រាប់រយក្បាល</Text> */}
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>ដកស្រង់តែចំនុចសំខាន់ៗរបស់សៀវភៅ​ ធ្វេីអោយការអាននិងស្តាប់សៀវភៅមួយក្បាល ចំនាយពេលត្រឹមតែ​ 15នាទី - 30នាទី​ តែប៉ុណ្ណោះ</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>មានការ​ Update នូវសៀវភៅថ្មីៗចូលក្នុង​ App "កូនសៀវភៅ" ជារៀងរាល់ថ្ងៃ</Text>
      </Layout>
    </ViewPager>
      <View style={styles.bottom}>
        <Button style={styles.submitButton} onPress={onAccessToken}>
          Get Accesstoken
        </Button>
        <LoginButton
          publishPermissions={['publish_actions', 'picture', 'email', 'friends', 'age_range']}
          onLoginFinished={onLoginFinished}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
      {/* <ImageBackground
        style={styles.appBar}
        source={require('../../assets/image-background.jpeg')}
      />
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={SignInData.empty()}
          validationSchema={SignInSchema}
          onSubmit={onFormSubmit}>
          {renderForm}
        </Formik>
        <Button
          style={styles.noAccountButton}
          appearance="ghost"
          status="basic"
          onPress={() => props.fetchData()}>
          Don't have an account?
        </Button>
        <View>
          {props.appData.isFetching && <Text>Loading</Text>}
          {props.appData.data.length
            ? props.appData.data.map((person, i) => {
                return (
                  <View key={i}>
                    <Text>Name: {person.name}</Text>
                    <Text>Email: {person.email}</Text>
                  </View>
                );
              })
            : null}
        </View>
      </Layout> */}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 36
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);

// export default connect()(SignInScreen)
