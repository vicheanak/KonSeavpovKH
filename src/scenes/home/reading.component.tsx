import React from 'react';
import { ListRenderItemInfo } from 'react-native';
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
  SelectItem
} from '@ui-kitten/components';
import { ReadingScreenProps } from '../../navigation/home.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { ProgressBar } from '../../components/progress-bar.component';
import { SearchIcon, StarIcon, ArrowIosForwardIcon } from '../../assets/icons';
import { Todo } from '../../data/todo.model';
import { connect } from 'react-redux';

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


const ReadingScreen = (props: any): ListElement => {

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
    props.navigation.navigate(AppRoute.TODO_DETAILS, { todo });
  };

  const renderReading = ({ item }: ListRenderItemInfo<Todo>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={navigateTodoDetails}>
      <Text category='s1'>
        {item.title}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
        {item.description}
      </Text>
      <ProgressBar
        style={styles.itemProgressBar}
        progress={item.progress}
        text={`${item.progress}%`}
      />
    </ListItem>
  );

  return (
    <Layout style={styles.container} level='1'>
      <Input
        style={styles.filterInput}
        placeholder={props.intlData.messages['search']}
        value={query}
        icon={SearchIcon}
        onChangeText={onChangeQuery}
      />
      <Select
        style={styles.filterInput}
        placeholder={props.intlData.messages['filter']}
        data={defaultOptions}
        selectedOption={selectedOption}
        onSelect={onSelect}
      />
      <List
        style={styles.list}
        data={todos}
        renderItem={renderReading}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
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
)(ReadingScreen);
