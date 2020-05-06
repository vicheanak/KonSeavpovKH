import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text, Button } from '@ui-kitten/components';
import { LibraryDetailScreenProps } from '../../navigation/library.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { AppRoute } from '../../navigation/app-routes';
import { LibraryBook } from '../../data/library-book.model';

export type LibraryDetailRouteParams = {
  libraryBook: LibraryBook;
}

export const LibraryDetailScreen = (props: LibraryDetailScreenProps): SafeAreaLayoutElement => {
  const library = props.route.params;
  console.log('Library Detail', library);
  return (
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
          Library Detail
        </Text>
      </Layout>
    </SafeAreaLayout>
  )
};

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
