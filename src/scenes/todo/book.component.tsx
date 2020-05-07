import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
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
  Card,
  Button,
  ListProps,
} from '@ui-kitten/components';
import {BookScreenProps} from '../../navigation/todo.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {ProgressBar} from '../../components/progress-bar.component';
import {SearchIcon, BookmarkIcon} from '../../assets/icons';
import {Todo} from '../../data/todo.model';
import {i18n} from '../../app/i18n';
import {connect} from 'react-redux';
import {updateLanguage} from '../../redux/actions';

const allTodos: Todo[] = [
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked3(),
];

const BookScreen = (props: any): ListElement => {
  const [todos, setTodos] = React.useState<Todo[]>(allTodos);
  const [query, setQuery] = React.useState<string>('');
  const styles = useStyleSheet(themedStyles);

  const {...listProps} = props;

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter(
      (todo: Todo): boolean => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      },
    );

    setTodos(nextTodos);
    setQuery(query);
  };

  const navigateTodoDetails = (todoIndex: number): void => {
    const {[todoIndex]: todo} = todos;
    props.navigation.navigate(AppRoute.TODO_DETAILS, {todo});
  };

  const renderItemHeader = ({
    item,
  }: ListRenderItemInfo<Todo>): React.ReactElement => (
    <View>
      <ImageBackground style={styles.itemHeader} source={item.photo} />
      <Text numberOfLines={1} style={styles.authorName}>Author Name is Very Long so Be Careful</Text>
    </View>
  );

  const renderTodo = (item: ListRenderItemInfo<Todo>): ListItemElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(item)}
      onPress={() => navigateTodoDetails(item.index)}>
      <View style={styles.itemTitle}>
        <Text
          category="s1"
          style={styles.productTitle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.item.title}
        </Text>
        <Button
          appearance="ghost"
          status="primary"
          style={styles.iconButton}
          icon={BookmarkIcon}
        />
      </View>
      <Text category="c1" style={styles.productShortDescription}>
        {item.item.description}
      </Text>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['book_for_you']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={todos}
        renderItem={renderTodo}
        {...listProps}
      />
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['trending_book']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={todos}
        renderItem={renderTodo}
        {...listProps}
      />
      <Text style={styles.hint} category="h6">
        {props.intlData.messages['new_book']}
      </Text>
      <List
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={todos}
        renderItem={renderTodo}
        {...listProps}
      />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  hint: {
    margin: 16,
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
  productItem: {
    flex: 1,
    margin: 5,
    width: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  authorName: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238,176,0,.4)',
    padding: 3,
    paddingLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginTop: 10,
  },
  productTitle: {
    marginHorizontal: -15,
    marginVertical: -10,
    fontWeight: 'bold',
    lineHeight: 20,
    height: 55,
    width: Dimensions.get('window').width / 2 - 80,
  },
  iconButton: {
    marginHorizontal: -20,
    marginTop: -15,
    height: 40,
    width: 40,
    backgroundColor: 'background-basic-color-1',
  },
  productShortDescription: {
    marginHorizontal: -15,
    marginVertical: 10,
    height: 30,
  },
  itemHeader: {
    height: 140,
  },
});

const mapStateToProps = state => {
  return {
    intlData: state.intlData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLanguage: lang => dispatch(updateLanguage(lang)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookScreen);
