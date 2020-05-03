import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text, Button } from '@ui-kitten/components';
import { HighlightDetailScreenProps } from '../../navigation/highlight-detail.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { AppRoute } from '../../navigation/app-routes';

export const HighlightDetailScreen = (props: HighlightDetailScreenProps): SafeAreaLayoutElement => (
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
        HIGHLIGHT Detail
      </Text>
    </Layout>
  </SafeAreaLayout>
  // <SafeAreaLayout
  //   style={styles.safeArea}
  //   insets={SaveAreaInset.TOP}>
  //   <Toolbar
  //     title='Kon Seavpov'
  //     backIcon={MenuIcon}
  //     onBackPress={props.navigation.toggleDrawer}
  //   />
  //   <Divider/>
  //   <Layout style={styles.container}>
  //     <Text category='h1'>
  //       HIGHLIGHT FOLDER
  //     </Text>
  //     <Button
  //       onPress={props.navigation.navigate(AppRoute.HIGHLIGHT_DETAIL)}>
  //       DONE
  //     </Button>
  //   </Layout>
  // </SafeAreaLayout>
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
