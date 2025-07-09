'use strict';

const poolify = (factory, options, size, max) => {
  const queue = [];
  const instances = new Array(size).fill(null).map(() => factory(options));

  let createdAmount = 0;

  const acquire = (callback) => {
    const instance = instances.pop();

    if (instance) {
      process.nextTick(callback, instance);
      return;
    }

    if (createdAmount + size < max) {
      createdAmount++;
      callback(factory(options));
      return;
    }

    queue.push(callback);
  };

  const release = (instance) => {
    if (queue.length) {
      const callback = queue.shift();
      process.nextTick(callback, instance);
      return;
    }
    if (instance) {
      instances.push(instance);
    }
  };

  return { acquire, release };
};

// Usage

const createBuffer = ({ bufferSize }) => new Uint8Array(bufferSize);

const pool = poolify(createBuffer, { bufferSize: 4096 }, 5, 6);

const callback = (instance) => {
  setTimeout(
    () => {
      console.log({ instance });
    },
    Math.random() * 3 * 1000,
  );
  pool.release(instance);
};

pool.acquire(callback);
pool.acquire(callback);
pool.acquire(callback);
pool.acquire(callback);
pool.acquire(callback);
pool.acquire(callback);
pool.acquire(callback);
