'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert');
const { PurchaseIterator, Basket } = require('./2-solution');

describe('2-solution module tests', () => {
  const mockPurchase = [
    { name: 'Item A', price: 300 },
    { name: 'Item B', price: 500 },
    { name: 'Item C', price: 700 },
  ];

  test(
    'PurchaseIterator should iterate over items asynchronously', async () => {
    const purchaseIterator = PurchaseIterator.create(mockPurchase);
    const items = [];
    for await (const item of purchaseIterator) {
      items.push(item);
    }
    assert.deepStrictEqual(
      items,
      mockPurchase,
      'PurchaseIterator should iterate over all items asynchronously',
    );
  });

  test('Basket should add items within the limit', () => {
    const basket = new Basket({ basketTotalLimit: 1000 });

    basket.add(mockPurchase[0]);
    basket.add(mockPurchase[1]);
    basket.add(mockPurchase[2]);

    assert.deepStrictEqual(
      basket.items.successful,
      [mockPurchase[0], mockPurchase[1]],
      'Successful items should only include items within the limit',
    );

    assert.deepStrictEqual(
      basket.items.failed,
      [mockPurchase[2]],
      'Failed items should include items that exceed the limit',
    );

    assert.strictEqual(
      basket.total,
      800,
      'Total should be the sum of successful item prices',
    );
  });

  test(
    'Basket end() should resolve the promise with correct result', async () => {
    const basket = new Basket({ basketTotalLimit: 900 });

    basket.add(mockPurchase[0]);
    basket.add(mockPurchase[1]);
    basket.add(mockPurchase[2]);
    basket.end();

    const result = await basket;
    const expectedResult = {
      successful: [mockPurchase[0], mockPurchase[1]],
      failed: [mockPurchase[2]],
      total: 800,
    };

    assert.deepStrictEqual(
      result,
      expectedResult,
      'Basket should resolve with the correct result',
    );
  });
});
