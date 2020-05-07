import { ImageSourcePropType } from 'react-native';

export class LibraryCategory {

  constructor(
    readonly id: number,
    readonly title_kh: string,
    readonly title_en: string,
    readonly photo: ImageSourcePropType
  ) {

  }

  static psychology(): LibraryCategory {
    return new LibraryCategory(
      0,
      "ចិត្តសាស្ត្រ",
      'Psychology',
      require('../assets/images/categories/psychology.png')
    );
  }

  static productivity(): LibraryCategory {
    return new LibraryCategory(
      1,
      "ផលិតភាព",
      'Productivity',
      require('../assets/images/categories/productivity.png')
    );
  }

  static communication(): LibraryCategory {
    return new LibraryCategory(
      2,
      "ទំនាក់ទំនង",
      'Communication',
      require('../assets/images/categories/communication.png')
    );
  }

  static mindfulness_happiness(): LibraryCategory {
    return new LibraryCategory(
      3,
      "សមាធិ​ & សុភមង្គល",
      'Mindfulness & Happiness',
      require('../assets/images/categories/mindfulness_happiness.png')
    );
  }

  static parenting(): LibraryCategory {
    return new LibraryCategory(
      4,
      "អប់រំកូនចៅ",
      'Parenting',
      require('../assets/images/categories/parenting.png')
    );
  }

  static marketing_sales(): LibraryCategory {
    return new LibraryCategory(
      5,
      "ទីផ្សារ & លក់",
      'Marketing & Sales',
      require('../assets/images/categories/marketing_sales.png')
    );
  }

  static history(): LibraryCategory {
    return new LibraryCategory(
      6,
      "ប្រវត្តសាស្ត្រ",
      'History',
      require('../assets/images/categories/history.png')
    );
  }

  static personal_development(): LibraryCategory {
    return new LibraryCategory(
      7,
      "អភិវឌ្ឍផ្ទាល់ខ្លួន",
      'Personal Development',
      require('../assets/images/categories/personal_development.png')
    );
  }

  static philosophy(): LibraryCategory {
    return new LibraryCategory(
      8,
      "ទស្សនវិជ្ជា",
      'Philosophy',
      require('../assets/images/categories/philosophy.png')
    );
  }

  static motivation_inspiration(): LibraryCategory {
    return new LibraryCategory(
      9,
      "ជំរុញទឹកចិត្ត",
      'Motivation & Inspiration',
      require('../assets/images/categories/motivation_inspiration.png')
    );
  }

  static health_nutrition(): LibraryCategory {
    return new LibraryCategory(
      10,
      "អាហារូបត្ថម្ភសុខភាព",
      'Health & Nutrition',
      require('../assets/images/categories/health_nutrition.png')
    );
  }

  static entrepreneurship(): LibraryCategory {
    return new LibraryCategory(
      11,
      "សហគ្រិន",
      'Entrepreneurship',
      require('../assets/images/categories/entrepreneurship.png')
    );
  }

  static creative(): LibraryCategory {
    return new LibraryCategory(
      12,
      "ច្នៃប្រឌិត",
      'Creativity',
      require('../assets/images/categories/creativity.png')
    );
  }

  static corporate_culture(): LibraryCategory {
    return new LibraryCategory(
      13,
      "វប្ប​ធ​ម៍​របស់​ក្រុមហ៊ុន",
      'Corporate Culture',
      require('../assets/images/categories/corporate_culture.png')
    );
  }

  static education(): LibraryCategory {
    return new LibraryCategory(
      14,
      "ការអប់រំ",
      'Education',
      require('../assets/images/categories/education.png')
    );
  }

  static religion_spirituality(): LibraryCategory {
    return new LibraryCategory(
      15,
      "សាសនា",
      'Religion & Spirituality',
      require('../assets/images/categories/religion_spirituality.png')
    );
  }

  static career_success(): LibraryCategory {
    return new LibraryCategory(
      16,
      "ការងារ​ & ជោគជ័យ",
      'Career & Success',
      require('../assets/images/categories/career_success.png')
    );
  }

  static management_leadership(): LibraryCategory {
    return new LibraryCategory(
      17,
      "ការគ្រប់គ្រង & ភាពដឹកនាំ",
      'Management & Leadership',
      require('../assets/images/categories/management_leadership.png')
    );
  }

  static science(): LibraryCategory {
    return new LibraryCategory(
      18,
      "វិទ្យាសាស្ត្រ",
      'Science',
      require('../assets/images/categories/science.png')
    );
  }

  static technology_future(): LibraryCategory {
    return new LibraryCategory(
      19,
      "បច្ចេកវិទ្យា & អនាគត",
      'Technology & Future',
      require('../assets/images/categories/technology_future.png')
    );
  }

  static sex_relationship(): LibraryCategory {
    return new LibraryCategory(
      20,
      "ទំនាក់ទំនងផ្លូវភេទ",
      'Sex & Relationship',
      require('../assets/images/categories/sex_relationships.png')
    );
  }

  static society_culture(): LibraryCategory {
    return new LibraryCategory(
      21,
      "វប្បធម៌សង្គម",
      'Society & Culture',
      require('../assets/images/categories/society_culture.png')
    );
  }

  static nature_environment(): LibraryCategory {
    return new LibraryCategory(
      22,
      "ធម្មជាតិ & បរិស្ថាន",
      'Nature & Environment',
      require('../assets/images/categories/nature_environment.png')
    );
  }

  static politics(): LibraryCategory {
    return new LibraryCategory(
      23,
      "នយោបាយ",
      'Politics',
      require('../assets/images/categories/politic.png')
    );
  }

  static money_investments(): LibraryCategory {
    return new LibraryCategory(
      24,
      "ប្រាក់ & ការវិនិយោគ",
      'Money & Investments',
      require('../assets/images/categories/money_investment.png')
    );
  }
}

