import { ImageSourcePropType } from 'react-native';

export class LibraryCategory {

  constructor(
    readonly id: number,
    readonly title: string,
    readonly photo: ImageSourcePropType
  ) {

  }

  static psychology(): LibraryCategory {
    return new LibraryCategory(
      0,
      'Psychology',
      require('../assets/images/categories/psychology.png')
    );
  }

  static productivity(): LibraryCategory {
    return new LibraryCategory(
      1,
      'Productivity',
      require('../assets/images/categories/productivity.png')
    );
  }

  static communication(): LibraryCategory {
    return new LibraryCategory(
      2,
      'Communication',
      require('../assets/images/categories/communication.png')
    );
  }

  static mindfulness_happiness(): LibraryCategory {
    return new LibraryCategory(
      3,
      'Mindfulness & Happiness',
      require('../assets/images/categories/mindfulness_happiness.png')
    );
  }

  static parenting(): LibraryCategory {
    return new LibraryCategory(
      4,
      'Parenting',
      require('../assets/images/categories/parenting.png')
    );
  }

  static marketing_sales(): LibraryCategory {
    return new LibraryCategory(
      5,
      'Marketing & Sales',
      require('../assets/images/categories/marketing_sales.png')
    );
  }

  static history(): LibraryCategory {
    return new LibraryCategory(
      6,
      'History',
      require('../assets/images/categories/history.png')
    );
  }

  static personal_development(): LibraryCategory {
    return new LibraryCategory(
      7,
      'Personal Development',
      require('../assets/images/categories/personal_development.png')
    );
  }

  static philosophy(): LibraryCategory {
    return new LibraryCategory(
      8,
      'Philosophy',
      require('../assets/images/categories/philosophy.png')
    );
  }

  static motivation_inspiration(): LibraryCategory {
    return new LibraryCategory(
      9,
      'Motivation & Inspiration',
      require('../assets/images/categories/motivation_inspiration.png')
    );
  }

  static health_nutrition(): LibraryCategory {
    return new LibraryCategory(
      10,
      'Health & Nutrition',
      require('../assets/images/categories/health_nutrition.png')
    );
  }

  static entrepreneurship(): LibraryCategory {
    return new LibraryCategory(
      11,
      'Entrepreneurship',
      require('../assets/images/categories/entrepreneurship.png')
    );
  }

  static creative(): LibraryCategory {
    return new LibraryCategory(
      12,
      'Creativity',
      require('../assets/images/categories/creativity.png')
    );
  }

  static corporate_culture(): LibraryCategory {
    return new LibraryCategory(
      13,
      'Corporate Culture',
      require('../assets/images/categories/corporate_culture.png')
    );
  }

  static education(): LibraryCategory {
    return new LibraryCategory(
      14,
      'Education',
      require('../assets/images/categories/education.png')
    );
  }

  static religion_spirituality(): LibraryCategory {
    return new LibraryCategory(
      15,
      'Religion & Spirituality',
      require('../assets/images/categories/religion_spirituality.png')
    );
  }

  static career_success(): LibraryCategory {
    return new LibraryCategory(
      16,
      'Career & Success',
      require('../assets/images/categories/career_success.png')
    );
  }

  static management_leadership(): LibraryCategory {
    return new LibraryCategory(
      17,
      'Management & Leadership',
      require('../assets/images/categories/management_leadership.png')
    );
  }

  static science(): LibraryCategory {
    return new LibraryCategory(
      18,
      'Science',
      require('../assets/images/categories/science.png')
    );
  }

  static technology_future(): LibraryCategory {
    return new LibraryCategory(
      19,
      'Technology & Future',
      require('../assets/images/categories/technology_future.png')
    );
  }

  static sex_relationship(): LibraryCategory {
    return new LibraryCategory(
      20,
      'Sex & Relationship',
      require('../assets/images/categories/sex_relationships.png')
    );
  }

  static society_culture(): LibraryCategory {
    return new LibraryCategory(
      21,
      'Society & Culture',
      require('../assets/images/categories/society_culture.png')
    );
  }

  static nature_environment(): LibraryCategory {
    return new LibraryCategory(
      22,
      'Nature & Environment',
      require('../assets/images/categories/nature_environment.png')
    );
  }

  static politics(): LibraryCategory {
    return new LibraryCategory(
      23,
      'Politics',
      require('../assets/images/categories/politic.png')
    );
  }

  static money_investments(): LibraryCategory {
    return new LibraryCategory(
      24,
      'Money & Investments',
      require('../assets/images/categories/money_investment.png')
    );
  }
}

