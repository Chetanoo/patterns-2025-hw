'use strict';

class Pool {
  #max;
  #factory;
  #instances;
  #factoryOptions;

  constructor(factory, factoryOptions, size, max) {
    this.#instances = new Array(size).fill(null)
      .map(() => factory(factoryOptions));
    this.#factory = factory;
    this.#factoryOptions = factoryOptions;
    this.#max = max;
  }

  acquire() {
    return this.#instances.pop() || this.#factory(this.#factoryOptions);
  }

  release(instance) {
    if (this.#instances.length < this.#max) {
      this.#instances.push(instance);
    }
  }
}

// Usage

const createBuffer = ({ bufferSize }) => new Uint8Array(bufferSize);

const pool = new Pool(createBuffer, { bufferSize: 4096 }, 5, 10);

const instance = pool.acquire();
console.log({ instance });
pool.release(instance);
