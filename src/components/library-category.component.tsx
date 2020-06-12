import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text, Card } from '@ui-kitten/components';
import { CloseIcon, BookmarkIcon, LibrarySaveIcon, ArrowIosForwardIcon } from '../assets/icons';
import { LibraryCategory } from '../data/library-category.model';
import { connect } from 'react-redux';

const LibraryCategoryComponent = (props: any): React.ReactElement => {

  const { style, libraryCategory, index, onDetailPress, intlData, ...listItemProps } = props;


  const onRowSelected = (index:number, id: any): void => {
    onDetailPress();
  };

  return (
    <Card
      style={styles.item}
      onPress={() => onRowSelected(props.index, libraryCategory.id)}>
       <Image
        style={styles.image}
        source={libraryCategory.photo}
      />
      <Text
        style={styles.itemTitle}
        category='s1'>
         {intlData.locale == 'kh' ? libraryCategory.title_kh : libraryCategory.title_en }
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    // padding: 16,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    // height: 500,
    padding: 16,
  },
  amountButton: {
    borderRadius: 20,
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
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 20,
    maxWidth: Dimensions.get('window').width / 2 - 30,
  },
  itemTitle: {
    alignSelf: 'center',
    marginTop: 8,
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

