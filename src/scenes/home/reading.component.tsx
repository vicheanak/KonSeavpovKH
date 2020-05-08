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
  Button
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
    setSelectedOption(option);
  };

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter((todo: Todo): boolean => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    setTodos(nextTodos);
    setQuery(query);
  };

  const navigateBookDetail = (todoIndex: number): void => {
    const { [todoIndex]: todo } = todos;
    props.navigation.navigate(AppRoute.BOOK_DETAIL, { todo });
  };

  const renderReading = ({ item }: ListRenderItemInfo<Todo>): ListItemElement => (
    <ListItem
      style={styles.item}
      onPress={navigateBookDetail}>
      <Image
        style={styles.image}
        source={item.photo}
      />
      <View style={styles.detailsContainer}>
        <Text category='s1'>
          {item.title}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          Author Name
        </Text>
        <ProgressBar
          style={styles.itemProgressBar}
          progress={item.progress}
          text={`${item.progress}%`}
        />
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
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    // height: 500,
    padding: 16,
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
    // flexDirection: 'row',
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
