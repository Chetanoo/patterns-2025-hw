'use strict';

class Product {
  constructor(value) {
    this.field = value;
  }
}

class Creator {
  constructor({ defaultValue }) {
    this.defaultValue = defaultValue;
  }

  factoryMethod(val) {
    return new Product(val || this.defaultValue);
  }
}

// Usage

const config = { defaultValue: 'default' };

const creator = new Creator(config);
console.dir(creator);
const product = creator.factoryMethod('value');
console.dir(product);
const product2 = creator.factoryMethod();
console.dir(product2);
