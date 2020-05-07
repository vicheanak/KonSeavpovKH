import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text } from '@ui-kitten/components';
import { FollowUsFacebookScreenProps } from '../../navigation/menu.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

export const FollowUsFacebookScreen = (props: FollowUsFacebookScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title='Kon Seavpov'
      onBackPress={props.navigation.goBack}
    />
    <Divider/>
    <Layout style={styles.container}>
      <Text category='h1'>
        Follow Us Facebook
      </Text>
    </Layout>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
