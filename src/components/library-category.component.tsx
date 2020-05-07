import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { CloseIcon, BookmarkIcon, LibrarySaveIcon, ArrowIosForwardIcon } from '../assets/icons';
import { LibraryCategory } from '../data/library-category.model';
import { connect } from 'react-redux';

const LibraryCategoryComponent = (props: any): React.ReactElement => {

  const { style, libraryCategory, index, onDetailPress, intlData, ...listItemProps } = props;

  console.log('intlData ', intlData);

  const onRowSelected = (index:number, id: any): void => {
    console.log('index', index);
    console.log('id', id);
    onDetailPress();
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}
      onPress={() => onRowSelected(props.index, libraryCategory.id)}>
      <Image
        style={styles.image}
        source={libraryCategory.photo}
      />
      <View style={styles.detailsContainer}>
        <Text
          category='s1'>
          {intlData.locale == 'kh' ? libraryCategory.title_kh : libraryCategory.title_en }
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
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    width: 70,
    height: 70,
    padding: 16,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    // height: 500,
    padding: 16,
  },
  amountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});


const mapStateToProps = (state) => {
  return {
    intlData: state.intlData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryCategoryComponent)

