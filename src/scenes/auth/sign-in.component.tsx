import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, CheckBox, Layout } from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import { i18n } from '../../app/i18n';

export const SignInScreen = (props: SignInScreenProps) => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

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

  const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id='email'
        style={styles.formControl}
        placeholder={i18n('auth.email')}
        keyboardType='email-address'
      />
      <FormInput
        id='password'
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
          appearance='ghost'
          status='basic'
          onPress={navigateResetPassword}>
          {i18n('auth.forgot_password')}
        </Button>
      </View>
      <Button
        style={styles.submitButton}
        onPress={props.handleSubmit}>
        {i18n('auth.sign_in')}
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ImageBackground
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
          appearance='ghost'
          status='basic'
          onPress={navigateSignUp}>
          Don't have an account?
        </Button>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: 24
  },
  noAccountButton: {
    alignSelf: 'center',
  },
});
