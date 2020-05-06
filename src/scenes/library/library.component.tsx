import React from 'react';
import { StyleSheet, ListRenderItemInfo, View } from 'react-native';
import { Divider, Layout, Text, List, Input, Button, ListItemElement } from '@ui-kitten/components';
import { LibraryScreenProps } from '../../navigation/profile.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon, SearchIcon } from '../../assets/icons';
import { LibraryCategory } from '../../data/library-category.model';
import { LibraryCategoryComponent } from '../../components/library-category.component';
import {AppRoute} from '../../navigation/app-routes';

const initialLibraryCategories: LibraryCategory[] = [
  LibraryCategory.psychology(),
  LibraryCategory.productivity(),
  LibraryCategory.communication(),
  LibraryCategory.mindfulness_happiness(),
  LibraryCategory.parenting(),
  LibraryCategory.marketing_sales(),
  LibraryCategory.history(),
  LibraryCategory.personal_development(),
  LibraryCategory.philosophy(),
  LibraryCategory.motivation_inspiration(),
  LibraryCategory.health_nutrition(),
  LibraryCategory.entrepreneurship(),
  LibraryCategory.creative(),
  LibraryCategory.corporate_culture(),
  LibraryCategory.education(),
  LibraryCategory.religion_spirituality(),
  LibraryCategory.career_success(),
  LibraryCategory.management_leadership(),
  LibraryCategory.science(),
  LibraryCategory.technology_future(),
  LibraryCategory.sex_relationship(),
  LibraryCategory.society_culture(),
  LibraryCategory.nature_environment(),
  LibraryCategory.politics(),
  LibraryCategory.money_investments()
];

export const LibraryScreen = (props: LibraryScreenProps): SafeAreaLayoutElement => {

  const [libraryCategory] = React.useState<LibraryCategory[]>(initialLibraryCategories);
  const [query, setQuery] = React.useState<string>('');

  const onGoDetail = (id: number) => {
    const {[id]: category} = libraryCategory;
    console.log('category', category);
    props.navigation.navigate(AppRoute.LIBRARY_DETAIL, {category});
    console.log('onGoDetail => empty function');
  }

  const renderLibraryLibraryComponent = (info: ListRenderItemInfo<LibraryCategory>): ListItemElement => (
    <LibraryCategoryComponent
      style={styles.item}
      index={info.index}
      libraryCategory={info.item}
      onDetailPress={() => {onGoDetail(info.item.id)}}
    />
  );

  const onChangeQuery = (query: string): void => {
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
            data={libraryCategory}
            renderItem={renderLibraryLibraryComponent}
            ItemSeparatorComponent={Divider}
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
    // borderBottomWidth: 1
  },
  hairlineWidth: {
    height: 20
  },
  categoryTitle: {
    marginHorizontal: 16,
    marginVertical: 14,
  },
});
