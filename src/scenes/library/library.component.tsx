import React from 'react';
import { StyleSheet, ListRenderItemInfo, View } from 'react-native';
import { Divider, Layout, Text, List, Input, Button, ListItemElement } from '@ui-kitten/components';
import { LibraryScreenProps } from '../../navigation/library.navigator';
import { Toolbar, ToolbarMenu } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { MenuIcon, SearchIcon, HighlightIcon, BookIcon, BookmarkIcon, Khmer, English, BrushIcon  } from '../../assets/icons';
import { LibraryCategory } from '../../data/library-category.model';
import LibraryCategoryComponent from '../../components/library-category.component';
import {AppRoute} from '../../navigation/app-routes';
import { connect } from 'react-redux'
import { fetchData, updateLanguage } from '../../redux/actions';
import { ThemeContext } from '../../services/theme.service';

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

const LibraryScreen = (props: any): SafeAreaLayoutElement => {

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

  console.log('props.intlData', props.intlData);

  const menu: ToolbarMenu = [
    { title: props.intlData.messages['highlight'], icon: HighlightIcon},
    { title: props.intlData.messages['saved'], icon: BookmarkIcon},
    { title: props.intlData.messages['change_color'], icon: BrushIcon},
    { title: props.intlData.messages['khmer'], icon: Khmer},
    { title: props.intlData.messages['english'], icon: English}
  ];

  const setLanguage = (lang) => {
    props.updateLanguage(lang);
  };

  const themeContext = React.useContext(ThemeContext);

  const onMenuItemSelect = (index: number): void => {
    const { [index]: selectedItem } = menu;

    switch (selectedItem.icon) {
      case HighlightIcon:
        props.navigation.navigate(AppRoute.HIGHLIGHT);
        break;
      case BookmarkIcon:
        props.navigation.navigate(AppRoute.SAVED);
        break;
      case Khmer:
        setLanguage('kh');
        break;
      case English:
        setLanguage('en');
        break;
      case BrushIcon:
        themeContext.toggleTheme();
        break;
      default:
        props.navigation.navigate(selectedItem.title);
        break;
    }
  };

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets={SaveAreaInset.TOP}>
      <Toolbar
        title='Kon Seavpov'
        onMenuItemSelect={onMenuItemSelect}
        menu={menu}
        backIcon={MenuIcon}
        onBackPress={props.navigation.toggleDrawer}
      />
      <Divider/>
      <Layout style={styles.container}>
        <Text style={styles.categoryTitle} category="h6">
          {props.intlData.messages['search']}
        </Text>
        <Input
          style={styles.filterInput}
          placeholder={props.intlData.messages['titles_authors_topics']}
          value={query}
          icon={SearchIcon}
          onChangeText={onChangeQuery}
        />
        <Text style={styles.categoryTitle} category="h6">
        {props.intlData.messages['category']}
        </Text>
        <List
            data={libraryCategory}
            renderItem={renderLibraryLibraryComponent}
            numColumns={2}
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


const mapStateToProps = (state) => {
  return {
    intlData: state.intlData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLanguage: (lang) => dispatch(updateLanguage(lang))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryScreen)
