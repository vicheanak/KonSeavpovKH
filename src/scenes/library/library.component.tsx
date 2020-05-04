import React from 'react';
import { StyleSheet, ListRenderItemInfo, View } from 'react-native';
import { Divider, Layout, Text, List, Input, Button } from '@ui-kitten/components';
import { LibraryScreenProps } from '../../navigation/profile.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon, SearchIcon } from '../../assets/icons';
import { LibraryBook } from '../../data/library-book.model';
import { LibraryBookComponent } from '../../components/library-book.component';

const initialLibraryBooks: LibraryBook[] = [
  LibraryBook.psychology(),
  LibraryBook.productivity(),
  LibraryBook.communication(),
  LibraryBook.mindfulness_happiness(),
  LibraryBook.parenting(),
  LibraryBook.marketing_sales(),
  LibraryBook.history(),
  LibraryBook.personal_development(),
  LibraryBook.philosophy(),
  LibraryBook.motivation_inspiration(),
  LibraryBook.health_nutrition(),
  LibraryBook.entrepreneurship(),
  LibraryBook.creative(),
  LibraryBook.corporate_culture(),
  LibraryBook.education(),
  LibraryBook.religion_spirituality(),
  LibraryBook.career_success(),
  LibraryBook.management_leadership(),
  LibraryBook.science(),
  LibraryBook.technology_future(),
  LibraryBook.sex_relationship(),
  LibraryBook.society_culture(),
  LibraryBook.nature_environment(),
  LibraryBook.politics(),
  LibraryBook.money_investments()
];

export const LibraryScreen = (props: LibraryScreenProps): SafeAreaLayoutElement => {

  const [libraryBook] = React.useState<LibraryBook[]>(initialLibraryBooks);
  const [query, setQuery] = React.useState<string>('');

  const onSaved = () => {
    console.log('Saved Button Pressed');
  }

  const renderLibraryBookComponent = (info: ListRenderItemInfo<LibraryBook>): React.ReactElement => (
    <LibraryBookComponent
      style={styles.item}
      index={info.index}
      libraryBook={info.item}
      onSavedPress={onSaved}
    />
  );

  const renderItemSeparator = () => {
      return (
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.3)' }} />
      );
  }

  const onChangeQuery = (query: string): void => {
    // const nextTodos: Todo[] = allTodos.filter((todo: Todo): boolean => {
    //   return todo.title.toLowerCase().includes(query.toLowerCase());
    // });

    // setTodos(nextTodos);
    setQuery(query);
  };

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets={SaveAreaInset.TOP}>
      <Toolbar
        title='Kon Seavpov'
        backIcon={MenuIcon}
        onBackPress={props.navigation.toggleDrawer}
      />
      <Divider/>
      <Layout style={styles.container}>
        <Input
          style={styles.filterInput}
          placeholder='Titles, authors, or topics'
          value={query}
          icon={SearchIcon}
          onChangeText={onChangeQuery}
        />
        <Text style={styles.categoryTitle} category="h6">
          Category
        </Text>
        <List
            data={libraryBook}
            renderItem={renderLibraryBookComponent}
            ItemSeparatorComponent={renderItemSeparator}
          />
      </Layout>
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1
  },
  hairlineWidth: {
    height: 5
  },
  categoryTitle: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
});
