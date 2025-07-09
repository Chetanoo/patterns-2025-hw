'use strict';

class Product {
  constructor(...values) {
    this.values = values;
  }
}

class Creator {
  constructor({ defaultValue }) {
    this.defaultValue = defaultValue;
  }

  factoryMethod(...args) {
    return new Product(this.defaultValue, ...args);
  }
}

// Usage

const config = { defaultValue: 'default' };

const creator = new Creator(config);
console.dir(creator);
const product = creator.factoryMethod('test');
console.dir(product);
const product2 = creator.factoryMethod();
console.dir(product2);
