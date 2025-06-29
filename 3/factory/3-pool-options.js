'use strict';

const POOL_SIZE = 1000;
const ARRAY_SIZE = 2000;

const options = {
  poolSize: POOL_SIZE,
  factoryOptions: {
    arraySize: ARRAY_SIZE,
  },
};

const poolify = (factory, options) => {
  const { poolSize, factoryOptions } = options;

  const instances = new Array(poolSize).fill(null)
    .map(() => factory(factoryOptions));

  const acquire = () => {
    const instance = instances.pop() || factory();
    console.log('Get from pool, count =', instances.length);
    return instance;
  };

  const release = (instance) => {
    instances.push(instance);
    console.log('Recycle item, count =', instances.length);
  };

  return { acquire, release };
};

// Usage

const factory = ({ arraySize }) => new Array(arraySize).fill(0);
const arrayPool = poolify(factory, options);

const a1 = arrayPool.acquire();
const b1 = a1.map((x, i) => i).reduce((x, y) => x + y);
console.log(b1);

const a2 = factory();
const b2 = a2.map((x, i) => i).reduce((x, y) => x + y);
console.log(b2);

factory(a1);
factory(a2);

const a3 = factory();
const b3 = a3.map((x, i) => i).reduce((x, y) => x + y);
console.log(b3);
