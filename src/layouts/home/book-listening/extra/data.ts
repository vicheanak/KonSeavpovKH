import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title: string,
              readonly description: string,
              readonly price: ProductPrice,
              readonly primaryImage: ImageSourcePropType,
              readonly images: ImageSourcePropType[],
              readonly details: string[],
              readonly options: ProductOption[]) {
  }

  static centralParkApartment(): Product {
    return new Product(
      'Private Rooms with Central Park View',
      'The apartment consists of 2 separate bedrooms, 1 bathroom with a hair dryer. A flat-screen TV and Blu-ray player are available.\n' +
      '\n' +
      'Rodin Museum is 4.2 km from the apartment, while Orsay Museum is 5 km away. The nearest airport is Paris - Orly Airport, 13 km from the property.',
      ProductPrice.tenDollarsPerNight(),
      require('../assets/image-product.jpg'),
      [
        require('../assets/image-product.jpg'),
        require('../assets/image-product.jpg'),
        require('../assets/image-product.jpg'),
      ],
      [
        '2 Guests',
        '2 Bad',
        '2 Bath',
      ],
      [
        ProductOption.minutesOption(),
        ProductOption.chaptersOption(),
      ],
    );
  }
}

export class ProductPrice {

  constructor(readonly value: number,
              readonly currency: string,
              readonly scale: string) {
  }

  get formattedValue(): string {
    return `${this.currency}${this.value}`;
  }

  get formattedScale(): string {
    return `/${this.scale}`;
  }

  static tenDollarsPerNight(): ProductPrice {
    return new ProductPrice(10, '$', 'night');
  }
}

export class ProductOption {

  constructor(readonly icon: string,
              readonly title: string) {
  }

  static minutesOption(): ProductOption {
    return new ProductOption('clock', '13 mins');
  }

  static chaptersOption(): ProductOption {
    return new ProductOption('list', '9 Chapters');
  }

}

