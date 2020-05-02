import React from 'react';
import { Divider, Tab, TabBar, TabElement } from '@ui-kitten/components';
import { TodoScreenProps } from '../../navigation/todo.navigator';
import { AppRoute } from '../../navigation/app-routes';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Toolbar, ToolbarMenu } from '../../components/toolbar.component';
import { InfoIcon, LogoutIcon, StarIcon, MenuIcon, BookIcon, BookmarkIcon, Khmer, English } from '../../assets/icons';
import { ThemeContext } from '../../services/theme.service';
import { i18n, switchLanguage  } from '../../app/i18n';
import { useFocusEffect } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { connect } from 'react-redux'
import { fetchData, updateLanguage } from '../../redux/actions';


// const TodoTabBar = (props: TodoScreenProps): SafeAreaLayoutElement => {
  const TodoTabBar = (props: any) => {
  
  const themeContext = React.useContext(ThemeContext);

    
  const menu: ToolbarMenu = [
    { title: props.intlData.messages['highlight'], icon: StarIcon},
    { title: props.intlData.messages['saved'], icon: BookmarkIcon},
    { title: props.intlData.messages['khmer'], icon: Khmer},
    { title: props.intlData.messages['english'], icon: English},
  ];

  const setLanguage = (lang) => {
    // switchLanguage(lang);
    props.updateLanguage(lang);
  };

  const onMenuItemSelect = (index: number): void => {
    const { [index]: selectedItem } = menu;

    switch (selectedItem.icon) {
      case StarIcon:
        props.navigation.navigate(AppRoute.AUTH);
        break;
      case BookmarkIcon:
        themeContext.setCurrentTheme('dark');
        break;
      case Khmer:
        setLanguage('kh');
        break;
      case English:
        setLanguage('en');
        break;
      default:
        props.navigation.navigate(selectedItem.title);
        break;
    }
  };

  const onTabSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  const createNavigationTabForRoute = (route): TabElement => {
    const { options } = props.descriptors[route.key];
    return (
      <Tab
        key={route.key}
        title={options.title}
        // @ts-ignore: all Tab Screens options strictly have UI Kitten Icon
        icon={options.tabBarIcon}
      />
    );
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title='Kon Seavpov'
        onMenuItemSelect={onMenuItemSelect}
        menu={menu}
        backIcon={MenuIcon}
        onBackPress={props.navigation.toggleDrawer}
      />
      <TabBar
        selectedIndex={props.state.index}
        onSelect={onTabSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </TabBar>
      <Divider/>
    </SafeAreaLayout>
  );
};


const mapStateToProps = (state) => {
  console.log('mapState', state);
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
)(TodoTabBar)
