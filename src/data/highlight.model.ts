import { ImageSourcePropType } from 'react-native';

export class HighlightModel {

  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly photo: ImageSourcePropType,
    readonly progress: number,
  ) {

  }

  static mocked0(): HighlightModel {
    return new HighlightModel(
      0,
      'Learn React Navigation 5',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      require('../assets/images/image-profile.jpg'),
      33,
    );
  }

  static mocked1(): HighlightModel {
    return new HighlightModel(
      1,
      'Learn UI Kitten 4',
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      require('../assets/images/image-plant-1.jpg'),
      79,
    );
  }

  static mocked2(): HighlightModel {
    return new HighlightModel(
      2,
      'Learn Eva Design System',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
      require('../assets/images/image-plant-1.jpg'),
      62,
    );
  }

  static mocked3(): HighlightModel {
    return new HighlightModel(
      3,
      'Learn Eva Design System',
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
      require('../assets/images/image-plant-3.jpg'),
      62,
    );
  }
}

