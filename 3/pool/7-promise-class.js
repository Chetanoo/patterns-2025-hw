'use strict';

class Pool {
  #max;
  #instances;
  #queue = [];
  #factory;
  #options;
  #size;
  #createdAmount = 0;

  constructor(factory, options, size, max) {
    this.#instances = new Array(size).fill(null)
      .map(() => factory(options));
    this.#max = max;
    this.#size = size;
    this.#factory = factory;
    this.#options = options;
  }

  acquire() {
    return new Promise((resolve) => {
      const instance = this.#instances.pop();

      if (instance) resolve(instance);

      this.#queue.push(resolve);

      if (this.#createdAmount + this.#size < this.#max) {
        this.#createdAmount++;
        this.#instances.push(this.#factory(this.#options));
      }
    });
  }

  release(instance) {
    if (this.#queue.length) {
      const resolve = this.#queue.pop();
      resolve(instance);
      return;
    }

    if (instance) {
      this.#instances.push(instance);
    }
  }
}

// Usage

const createBuffer = ({ bufferSize }) => new Uint8Array(bufferSize);

const pool = new Pool(createBuffer, { bufferSize: 4096 }, 5, 6);

pool.acquire().then(async (instance) => {
  setTimeout(() => {
    console.log({ instance });
  }, Math.random() * 3 * 1000);
  pool.release(instance);
});

