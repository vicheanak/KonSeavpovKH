import React from 'react';
import { ListRenderItemInfo, Image, View } from 'react-native';
import {  
  Input,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  StyleService,
  Text,
  useStyleSheet,
  IndexPath, 
  Select, 
  SelectItem,
  Divider,
  Button } from '@ui-kitten/components';
// import { SavedScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppRoute } from '../../navigation/app-routes';
import { SearchIcon, StarIcon, ArrowIosForwardIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';
import { BookmarkIcon } from './../../assets/icons';



const allTodos: Todo[] = [
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
];


const HighlightScreen = (props: any): SafeAreaLayoutElement => {

  const [todos, setTodos] = React.useState<Todo[]>(allTodos);
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);


  const defaultOptions: any[] = [
    { id: 1, text: props.intlData.messages['read_in_progress'] },
    { id: 2, text: props.intlData.messages['done_reading'] },
    { id: 3, text: props.intlData.messages['finished_downloads'] },
    { id: 4, text: props.intlData.messages['not_yet_read'] },
  ];

  const [selectedOption, setSelectedOption] = React.useState(defaultOptions);

  const onSelect = (option) => {
    console.log('Option', option);
    setSelectedOption(option);
  };

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter((todo: Todo): boolean => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    setTodos(nextTodos);
    setQuery(query);
  };

  const navigateTodoDetails = (todoIndex: number): void => {
    const { [todoIndex]: todo } = todos;
    // props.navigation.navigate(AppRoute.TODO_DETAILS, { todo });
    props.navigation.navigate(AppRoute.HIGHLIGHT_DETAIL, {id: 1, title: 'One'});
  };

  const renderSaved = ({ item }: ListRenderItemInfo<Todo>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={navigateTodoDetails}>
      <Image
        style={styles.image}
        source={item.photo}
      />
      <View style={styles.detailsContainer}>
        <Text category='s1'>
          {item.title}
        </Text>
        <Text
          category='s2'
          status='success'
          style={styles.quote}>
          5 Quotes
        </Text>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status="primary"
        icon={ArrowIosForwardIcon}
      />
    </ListItem>
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
    <Layout style={styles.container} level='1'>
      <List
        style={styles.list}
        data={todos}
        renderItem={renderSaved}
        ItemSeparatorComponent={Divider}
      />
    </Layout>

  </SafeAreaLayout>
   
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: "background-basic-color-1"
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
  image: {
    width: 70,
    height: 70,
    padding: 16,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  quote: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
});



const mapStateToProps = state => {
  return {
    intlData: state.intlData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HighlightScreen);
