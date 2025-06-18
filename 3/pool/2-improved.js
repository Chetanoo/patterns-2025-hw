'use strict';

const poolify = (
  factory,
  factoryOptions,
  size,
  max,
) => {
  const instances = new Array(size).fill(null)
    .map(() => factory(factoryOptions));

  const acquire = () => instances.pop() || factory(factoryOptions);

  const release = (instance) => {
    if (instances.length < max) {
      instances.push(instance);
    }
  };

  return { acquire, release };
};

const createBuffer = ({ bufferSize }) => new Uint8Array(bufferSize);

const pool = poolify(
  createBuffer,
  { bufferSize: 4096 },
  5,
  10,
);

const instance = pool.acquire();
console.log({ instance });
pool.release(instance);
