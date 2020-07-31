
import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { Button, CheckBox, Layout } from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { i18n } from '../../app/i18n';
import { connect } from 'react-redux'
import { loginUserFacebook } from '../../redux/actions';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

import { Toolbar } from '../../components/toolbar.component';

const SignInScreen = (props: any) => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  // props.fetchData();

  const onFormSubmit = (values: SignInData): void => {
    console.log({values});
    // navigateHome();
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

  const renderForm = (formProps: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id='phonenumber'
        style={styles.formControl}
        placeholder="Phone Number"
        keyboardType='number-pad'
      />
      <FormInput
        id='password'
        style={styles.formControl}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
        icon={passwordVisible ? EyeIcon : EyeOffIcon}
        onIconPress={onPasswordIconPress}
      />
      <View style={styles.resetPasswordContainer}>
        <Button
          appearance='ghost'
          status='basic'
          textStyle={{fontSize: 13, lineHeight: 30}}
          onPress={navigateResetPassword}>
            Forgot Password
        </Button>
      </View>
      <Button
        style={styles.submitButton}
        textStyle={{fontSize: 15, lineHeight: 25}}
        appearance="outline"
        onPress={formProps.handleSubmit}>
          Sign In
      </Button>
    </React.Fragment>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets={[SaveAreaInset.TOP, SaveAreaInset.BOTTOM]}>
      <ImageBackground
        style={styles.appBar}
        source={require('../../assets/image-background.jpeg')}
      >
        <Toolbar
          appearance='control'
          onBackPress={props.navigation.goBack}
        />
        </ImageBackground>
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={SignInData.empty()}
          // validationSchema={SignInSchema}
          onSubmit={onFormSubmit}>
          {renderForm}
        </Formik>
        <View>
        {
          props.appData.data.length ? (
            props.appData.data.map((person, i) => {
              return <View key={i} >
                <Text>Name: {person.name}</Text>
                <Text>Phonenumber: {person.phonenumber}</Text>
              </View>
            })
          ) : null
        }
        </View>
      </Layout>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    justifyContent: 'center',
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24
  },
  noAccountButton: {
    alignSelf: 'center',
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
)(SignInScreen);