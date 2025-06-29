'use strict';

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Creator {
  static factory(name) {
    return new Person(name);
  }
}

// Usage

const p1 = new Person('Marcus');
console.dir({ p1 });

const p2 = Creator.factory('Marcus');
console.dir({ p2 });

module.exports = {
  Person,
  personFactory: Creator,
};
