'use strict';

// Create Iterator for given dataset with Symbol.asyncIterator
// Use for..of to iterate it and pass data to Basket
// Basket is limited to certain amount
// After iteration ended Basket should return Thenable
// to notify us with final list of items, total and
// escalated errors

const purchase = [
  { name: 'Laptop',  price: 1500 },
  { name: 'Mouse',  price: 25 },
  { name: 'Keyboard',  price: 100 },
  { name: 'HDMI cable',  price: 10 },
  { name: 'Bag', price: 50 },
  { name: 'Mouse pad', price: 5 },
];

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
  limit = null;
  total = 0;
  notify;
  items = [];
  errors = {
    limitExceeded: false,
  };
  constructor({ limit }, notify) {
    this.limit = limit;
    this.notify = notify;
  }

  add(item) {
    this.items.push(item);
    this.total += item.price;
    if (this.total > this.limit) {
      this.errors.limitExceeded = true;
    }
  }

  end() {
    const data = {
      items: this.items,
      total: this.total,
      errors: this.errors,
    };
    return {
      then(onFulfilled) {
        onFulfilled(data);
      },
    };
  }
}

const main = async () => {
  const goods = PurchaseIterator.create(purchase);
  const basket = new Basket({ limit: 1050 }, (items, total) => {
    console.log('Items in basket', items);
    console.log('Total price', total);
  });
  // Hint: call async function without await
  for await (const item of goods) {
    basket.add(item);
  }
  // Hint: Add basket.end();
  basket.end().then((data) => console.log(data));
};

void main();
