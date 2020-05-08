import React from 'react';
import { StyleSheet, ListRenderItemInfo } from 'react-native';
import { Divider, Layout, Text, Button, ListItemElement, List } from '@ui-kitten/components';
import { LibraryDetailScreenProps } from '../../navigation/library.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';
import { AppRoute } from '../../navigation/app-routes';
import { LibraryCategory } from '../../data/library-category.model';
import { LibraryBook } from '../../data/library-book.model';
import { LibraryBookComponent } from '../../components/library-book.component';

export type LibraryDetailRouteParams = {
  libraryCategory: LibraryCategory;
}

const initialLibraryBooks: LibraryBook[] = [
  LibraryBook.mocked0(),
  LibraryBook.mocked1(),
  LibraryBook.mocked2(),
  LibraryBook.mocked3(),
  LibraryBook.mocked4(),
  LibraryBook.mocked5(),
  LibraryBook.mocked6()
];

export const LibraryDetailScreen = (props: LibraryDetailScreenProps): SafeAreaLayoutElement => {
  const library = props.route.params;
  const [libraryBook] = React.useState<LibraryBook[]>(initialLibraryBooks);

  const onGoDetail = (id: number) => {
    const {[id]: book} = libraryBook;
    props.navigation.navigate(AppRoute.LIBRARY_DETAIL, {book});
  }

  const renderLibraryLibraryComponent = (info: ListRenderItemInfo<LibraryBook>): ListItemElement => (
    <LibraryBookComponent
      index={info.index}
      libraryBook={info.item}
      onDetailPress={() => {onGoDetail(info.item.id)}}
    />
  );


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
        <List
            data={libraryBook}
            renderItem={renderLibraryLibraryComponent}
            ItemSeparatorComponent={Divider}
          />
      </Layout>
    </SafeAreaLayout>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1
  },
  categoryTitle: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
});
