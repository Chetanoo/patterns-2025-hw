'use strict';

const poolify = (
  factory,
  options,
  size,
  max,
) => {
  const instances = new Array(size).fill(null)
    .map(() => factory(options));

  let createdAmount = 0;

  const acquire = () => {
    const instance = instances.pop();

    if (instance) return instance;

    if (size + createdAmount < max) {
      createdAmount++;
      return factory(options);
    }

    return null;
  };

  const release = (instance) => {
    if (instance) {
      instances.push(instance);
    }
  };

  return { acquire, release };
};

// Usage

const createBuffer = ({ bufferSize }) => new Uint8Array(bufferSize);

const pool = poolify(
  createBuffer,
  { bufferSize: 4096 },
  5,
  10,
);

const instance = pool.acquire();
console.log({ instance });
const instance2 = pool.acquire();
console.log({ instance2 });
const instance3 = pool.acquire();
console.log({ instance3 });
pool.release(instance);
pool.release(instance2);
pool.release(instance3);
const instance4 = pool.acquire();
console.log({ instance4 });
