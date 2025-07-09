'use strict';

const assert = require('node:assert');
const { describe, test } = require('node:test');

const { Storage } = require('./2-module.js');

const { mockData } = require('./mocks');


describe('2-module unit tests', () => {
  test('should select records by single query', async () => {
    const db = new Storage('mockStorage.dat');
    const query = { city: 'Roma' };

    const cursor = db.select(query);

    const results = [];
    for await (const record of cursor) {
      results.push(record);
    }

    assert.deepStrictEqual(results, [
      { city: 'Roma', name: 'Marcus Aurelius' },
      { city: 'Roma', name: 'Lucius Verus' },
    ]);
  });

  test('should select records by multiple queries', async () => {
    const db = new Storage('mockStorage.dat');
    const query = { city: 'Roma', name: 'Lucius Verus' }; // Multiple queries

    const cursor = db.select(query);

    const results = [];
    for await (const record of cursor) {
      results.push(record);
    }

    assert.deepStrictEqual(results, [
      { city: 'Roma', name: 'Lucius Verus' },
    ]);
  });

  test('should not filter records on empty query', async () => {
    const db = new Storage('mockStorage.dat');
    const query = {};

    const cursor = db.select(query);

    const results = [];
    for await (const record of cursor) {
      results.push(record);
    }

    assert.deepStrictEqual(results, [
      { city: 'Kiev', name: 'Glushkov' },
      { city: 'Roma', name: 'Marcus Aurelius' },
      { city: 'Shaoshan', name: 'Mao Zedong' },
      { city: 'Roma', name: 'Lucius Verus' },
    ]);
  });


});

describe('2-module integration tests', () => {
  test('test', async () => {
    const query = { city: 'Roma' };
    const db = new Storage('./storage.dat');

    const cursor = db.select(query);

    const result = [];

    for await (const record of cursor) {
      result.push(record);
    }

    assert.deepStrictEqual(result, mockData);
  });
});
