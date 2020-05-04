import { ImageSourcePropType } from 'react-native';

export class LibraryBook {

  constructor(
    readonly id: number,
    readonly title: string,
    readonly photo: ImageSourcePropType
  ) {

  }

  static psychology(): LibraryBook {
    return new LibraryBook(
      0,
      'Psychology',
      require('../assets/images/image-profile.jpg')
    );
  }

  static productivity(): LibraryBook {
    return new LibraryBook(
      1,
      'Productivity',
      require('../assets/images/image-plant-1.jpg')
    );
  }

  static communication(): LibraryBook {
    return new LibraryBook(
      2,
      'Communication',
      require('../assets/images/image-plant-1.jpg')
    );
  }

  static mindfulness_happiness(): LibraryBook {
    return new LibraryBook(
      3,
      'Mindfulness & Happiness',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static parenting(): LibraryBook {
    return new LibraryBook(
      4,
      'Parenting',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static marketing_sales(): LibraryBook {
    return new LibraryBook(
      5,
      'Marketing & Sales',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static history(): LibraryBook {
    return new LibraryBook(
      6,
      'History',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static personal_development(): LibraryBook {
    return new LibraryBook(
      7,
      'Personal Development',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static philosophy(): LibraryBook {
    return new LibraryBook(
      8,
      'Philosophy',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static motivation_inspiration(): LibraryBook {
    return new LibraryBook(
      9,
      'Motivation & Inspiration',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static health_nutrition(): LibraryBook {
    return new LibraryBook(
      10,
      'Health & Nutrition',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static entrepreneurship(): LibraryBook {
    return new LibraryBook(
      11,
      'Entrepreneurship',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static creative(): LibraryBook {
    return new LibraryBook(
      12,
      'Creativity',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static corporate_culture(): LibraryBook {
    return new LibraryBook(
      13,
      'Corporate Culture',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static education(): LibraryBook {
    return new LibraryBook(
      14,
      'Education',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static religion_spirituality(): LibraryBook {
    return new LibraryBook(
      15,
      'Religion & Spirituality',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static career_success(): LibraryBook {
    return new LibraryBook(
      16,
      'Career & Success',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static management_leadership(): LibraryBook {
    return new LibraryBook(
      17,
      'Management & Leadership',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static science(): LibraryBook {
    return new LibraryBook(
      18,
      'Science',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static technology_future(): LibraryBook {
    return new LibraryBook(
      19,
      'Technology & Future',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static sex_relationship(): LibraryBook {
    return new LibraryBook(
      20,
      'Sex & Relationship',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static society_culture(): LibraryBook {
    return new LibraryBook(
      21,
      'Society & Culture',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static nature_environment(): LibraryBook {
    return new LibraryBook(
      22,
      'Nature & Environment',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static politics(): LibraryBook {
    return new LibraryBook(
      23,
      'Politics',
      require('../assets/images/image-plant-3.jpg')
    );
  }

  static money_investments(): LibraryBook {
    return new LibraryBook(
      24,
      'Money & Investments',
      require('../assets/images/image-plant-3.jpg')
    );
  }
}

