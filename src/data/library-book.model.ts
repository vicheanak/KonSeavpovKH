import { ImageSourcePropType } from 'react-native';

export class LibraryBook {

  constructor(
    readonly id: number,
    readonly title: string,
    readonly author: string,
    readonly shortDescription: string,
    readonly photo: ImageSourcePropType
  ) {

  }

  static  mocked0(): LibraryBook {
    return new LibraryBook(
      0,
      '15 Invaluable Laws of Growth',
      'John C. Maxwell',
      'Live Them and Reach Your Potential',
      require('../assets/images/books/book0.jpg')
    );
  }

  static  mocked1(): LibraryBook {
    return new LibraryBook(
      1,
      'The Great Mental Models',
      'Shane Parrish, Rhiannon',
      'General Thinking Concepts',
      require('../assets/images/books/book1.jpg')
    );
  }

  static  mocked2(): LibraryBook {
    return new LibraryBook(
      2,
      'The Power of Bad',
      'John Tierney and Roy Baumeister',
      'How the Negativity Effect Rules Us',
      require('../assets/images/books/book2.jpg')
    );
  }

  static  mocked3(): LibraryBook {
    return new LibraryBook(
      3,
      'Happy Accidents',
      'David Ahear, Frank Ford',
      'The Transofmrative Power of "Yes"',
      require('../assets/images/books/book3.jpg')
    );
  }

  static  mocked4(): LibraryBook {
    return new LibraryBook(
      4,
      'The Courage Habit',
      'Kate Swoboda',
      'How to Accept Your Fears',
      require('../assets/images/books/book4.jpg')
    );
  }

  static  mocked5(): LibraryBook {
    return new LibraryBook(
      5,
      'An Economist Walks Into a Brothel',
      'Alison Schrager',
      'And Other Unexpected Places to Understand Risk',
      require('../assets/images/books/book5.jpg')
    );
  }

  static  mocked6(): LibraryBook {
    return new LibraryBook(
      6,
      'Tiny Habits',
      'BJ Fogg',
      'The Small Changes that Change Everything',
      require('../assets/images/books/book6.jpg')
    );
  }

}

