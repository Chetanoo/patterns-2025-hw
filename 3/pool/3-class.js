'use strict';

class Pool {
  #max;
  #factory;
  #instances;
  #options;
  #size;
  #createdAmount = 0;

  constructor(factory, options, size, max) {
    this.#instances = new Array(size).fill(null)
      .map(() => factory(options));
    this.#factory = factory;
    this.#options = options;
    this.#max = max;
    this.#size = size;
  }

  acquire() {
    const instance = this.#instances.pop();

    if (instance) return instance;

    if (this.#createdAmount + this.#size < this.#max) {
      this.#createdAmount++;
      return this.#factory(this.#options);
    }

    return null;
  }

  release(instance) {
    if (instance) {
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
