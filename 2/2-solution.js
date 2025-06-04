'use strict';

const { purchase } = require('./mocks');

const PurchaseIterator = {
  create(items) {
    const asyncIterator =  {
        counter: 0,
        async next() {
          const item = items[this.counter];
          this.counter++;
          return {
            value: item,
            done: this.counter >= items.length,
          };
        },
    };
    return {
      [Symbol.asyncIterator]: () => asyncIterator,
    };
  },
};

class Basket {
  #promise;
  #resolve;
  #reject;

  limit;
  total = 0;

  items = {
    successful: [],
    failed: [],
  };

  constructor({ basketTotalLimit }) {
    const { resolve, promise, reject } = Promise.withResolvers();

    this.#promise = promise;
    this.#resolve = resolve;
    this.#reject = reject;
    this.limit = basketTotalLimit;
  }

  add(item) {
    const currentLimit = this.limit - this.total;
    if (currentLimit < item.price) {
      this.items.failed.push(item);
    } else {
      this.items.successful.push(item);
      this.total += item.price;
    }
  }

  end() {
    const data = {
      successful: this.items.successful,
      failed: this.items.failed,
      total: this.total,
    };
    this.#resolve(data);
    return this;
  }

  then(onFulfilled) {
    this.#promise.then(onFulfilled);
    return this;
  }

  catch(onRejected) {
    this.#promise.catch(onRejected);
    return this;
  }

  finally(onFinally) {
    return this.#promise.finally(onFinally);
  }
}

const main = async () => {
  const goods = PurchaseIterator.create(purchase);
  const basket = new Basket({ basketTotalLimit: 1050 });

  for await (const item of goods) {
    basket.add(item);
  }

  basket
    .end()
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    .finally(() => console.log('what a final'));
};

void main();
