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

  factoryMethod() {
    return new Product(this.defaultValue);
  }
}

// Usage

const config = { defaultValue: 'default' };

const creator = new Creator(config);
console.dir(creator);
const product = creator.factoryMethod();
console.dir(product);
const product2 = creator.factoryMethod();
console.dir(product2);
