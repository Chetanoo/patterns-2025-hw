'use strict';

const poolify = (factory, options, size, max) => {
  const queue = [];
  const instances = new Array(size).fill(null).map(() => factory(options));

  let createdAmount = 0;

  const acquire = () =>
    new Promise((resolve) => {
      const instance = instances.pop();

      if (instance) resolve(instance);


      if (createdAmount + size < max) {
        createdAmount++;
        resolve(factory(options));
        return;
      }

      queue.push(resolve);

    });

  const release = (instance) => {
    if (queue.length) {
      const resolve = queue.shift();
      resolve(instance);
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

pool.acquire().then((instance) => {
  setTimeout(
    () => {
      console.log({ instance });
    },
    Math.random() * 3 * 1000,
  );
  pool.release(instance);
});
