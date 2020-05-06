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
      require('../assets/images/categories/psychology.png')
    );
  }

  static productivity(): LibraryBook {
    return new LibraryBook(
      1,
      'Productivity',
      require('../assets/images/categories/productivity.png')
    );
  }

  static communication(): LibraryBook {
    return new LibraryBook(
      2,
      'Communication',
      require('../assets/images/categories/communication.png')
    );
  }

  static mindfulness_happiness(): LibraryBook {
    return new LibraryBook(
      3,
      'Mindfulness & Happiness',
      require('../assets/images/categories/mindfulness_happiness.png')
    );
  }

  static parenting(): LibraryBook {
    return new LibraryBook(
      4,
      'Parenting',
      require('../assets/images/categories/parenting.png')
    );
  }

  static marketing_sales(): LibraryBook {
    return new LibraryBook(
      5,
      'Marketing & Sales',
      require('../assets/images/categories/marketing_sales.png')
    );
  }

  static history(): LibraryBook {
    return new LibraryBook(
      6,
      'History',
      require('../assets/images/categories/history.png')
    );
  }

  static personal_development(): LibraryBook {
    return new LibraryBook(
      7,
      'Personal Development',
      require('../assets/images/categories/personal_development.png')
    );
  }

  static philosophy(): LibraryBook {
    return new LibraryBook(
      8,
      'Philosophy',
      require('../assets/images/categories/philosophy.png')
    );
  }

  static motivation_inspiration(): LibraryBook {
    return new LibraryBook(
      9,
      'Motivation & Inspiration',
      require('../assets/images/categories/motivation_inspiration.png')
    );
  }

  static health_nutrition(): LibraryBook {
    return new LibraryBook(
      10,
      'Health & Nutrition',
      require('../assets/images/categories/health_nutrition.png')
    );
  }

  static entrepreneurship(): LibraryBook {
    return new LibraryBook(
      11,
      'Entrepreneurship',
      require('../assets/images/categories/entrepreneurship.png')
    );
  }

  static creative(): LibraryBook {
    return new LibraryBook(
      12,
      'Creativity',
      require('../assets/images/categories/creativity.png')
    );
  }

  static corporate_culture(): LibraryBook {
    return new LibraryBook(
      13,
      'Corporate Culture',
      require('../assets/images/categories/corporate_culture.png')
    );
  }

  static education(): LibraryBook {
    return new LibraryBook(
      14,
      'Education',
      require('../assets/images/categories/education.png')
    );
  }

  static religion_spirituality(): LibraryBook {
    return new LibraryBook(
      15,
      'Religion & Spirituality',
      require('../assets/images/categories/religion_spirituality.png')
    );
  }

  static career_success(): LibraryBook {
    return new LibraryBook(
      16,
      'Career & Success',
      require('../assets/images/categories/career_success.png')
    );
  }

  static management_leadership(): LibraryBook {
    return new LibraryBook(
      17,
      'Management & Leadership',
      require('../assets/images/categories/management_leadership.png')
    );
  }

  static science(): LibraryBook {
    return new LibraryBook(
      18,
      'Science',
      require('../assets/images/categories/science.png')
    );
  }

  static technology_future(): LibraryBook {
    return new LibraryBook(
      19,
      'Technology & Future',
      require('../assets/images/categories/technology_future.png')
    );
  }

  static sex_relationship(): LibraryBook {
    return new LibraryBook(
      20,
      'Sex & Relationship',
      require('../assets/images/categories/sex_relationships.png')
    );
  }

  static society_culture(): LibraryBook {
    return new LibraryBook(
      21,
      'Society & Culture',
      require('../assets/images/categories/society_culture.png')
    );
  }

  static nature_environment(): LibraryBook {
    return new LibraryBook(
      22,
      'Nature & Environment',
      require('../assets/images/categories/nature_environment.png')
    );
  }

  static politics(): LibraryBook {
    return new LibraryBook(
      23,
      'Politics',
      require('../assets/images/categories/politic.png')
    );
  }

  static money_investments(): LibraryBook {
    return new LibraryBook(
      24,
      'Money & Investments',
      require('../assets/images/categories/money_investment.png')
    );
  }
}

