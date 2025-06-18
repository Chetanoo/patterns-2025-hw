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

// Another approach
class Creator2 {
  constructor(Blueprint) {
    this.Blueprint = Blueprint;
  }

  factoryMethod(args) {
    return new this.Blueprint(...args);
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


const creator2 = new Creator2(Product);
console.dir(creator2);
const productV = creator.factoryMethod('value2');
console.dir(productV);
