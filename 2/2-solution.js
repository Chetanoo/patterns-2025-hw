'use strict';

const { purchase } = require('./mocks');

class PurchaseIterator {
  #items = [];

  constructor(purchase) {
    this.#items = purchase;
  }

  static create(items) {
    return new PurchaseIterator(items);
  }

  [Symbol.asyncIterator]() {
    let counter = 0;
    const items = this.#items;
    return {
      async next() {
        const item = items[counter];
        counter++;
        return {
          value: item,
          done: counter > items.length,
        };
      },
  };
  }
}

class Basket {
  #promise;
  #resolve;

  limit;
  total = 0;

  items = {
    successful: [],
    failed: [],
  };

  constructor({ basketTotalLimit }) {
    const { resolve, promise } = Promise.withResolvers();

    this.#promise = promise;
    this.#resolve = resolve;
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
    return this.#promise.then(onFulfilled);
  }

  finally(onFinally) {
    return this.#promise.finally(onFinally);
  }
}

const printBasket = (basket) => {
  basket
    .then((data) => console.log(data))
    .finally(() => console.log('Finished'));
};

const main = async () => {
  const goods = PurchaseIterator.create(purchase);
  const basket = new Basket({ basketTotalLimit: 1050 });

  printBasket(basket);

  for await (const item of goods) {
    basket.add(item);
  }

  basket.end();
};

void main();

module.exports = {
  PurchaseIterator,
  Basket,
  printBasket,
};
