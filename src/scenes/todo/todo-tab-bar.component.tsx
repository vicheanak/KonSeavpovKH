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
import { InfoIcon, LogoutIcon, MenuIcon } from '../../assets/icons';

const menu: ToolbarMenu = [
  { title: 'About', icon: InfoIcon },
  { title: 'Log Out', icon: LogoutIcon },
];

export const TodoTabBar = (props: TodoScreenProps): SafeAreaLayoutElement => {

  const onMenuItemSelect = (index: number): void => {
    const { [index]: selectedItem } = menu;

    switch (selectedItem.title) {
      case 'Log Out':
        props.navigation.navigate(AppRoute.AUTH);
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
