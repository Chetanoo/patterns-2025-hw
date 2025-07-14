'use strict';

const assert = require('node:assert');
const { describe, test } = require('node:test');
const { Readable } = require('node:stream');

const { FileStorage } = require('./2-module.js');

const { mockData } = require('./mocks');
const { LineCursor } = require('./2-module');

const data = [
  { city: 'Kiev', name: 'Glushkov' },
  { city: 'Roma', name: 'Marcus Aurelius' },
  { city: 'Shaoshan', name: 'Mao Zedong' },
  { city: 'Roma', name: 'Lucius Verus' },
];

const streamData = data.map((el) => JSON.stringify(el)).join('\n');

describe('2-module unit tests', () => {
  test('should select records by single query', async () => {
    const stream = Readable.from(streamData);
    const mockStorage = { stream };

    const query = { city: 'Roma' };

    const cursor = new LineCursor(mockStorage, query);

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
    const stream = Readable.from(streamData);
    const mockStorage = { stream };

    const query = { city: 'Roma', name: 'Lucius Verus' }; // Multiple queries

    const cursor = new LineCursor(mockStorage, query);

    const results = [];
    for await (const record of cursor) {
      results.push(record);
    }

    assert.deepStrictEqual(results, [
      { city: 'Roma', name: 'Lucius Verus' },
    ]);
  });

  test('should not filter records on empty query', async () => {
    const stream = Readable.from(streamData);
    const mockStorage = { stream };

    const query = {};

    const cursor = new LineCursor(mockStorage, query);

    const results = [];
    for await (const record of cursor) {
      results.push(record);
    }

    assert.deepStrictEqual(results, data);
  });


});

describe('2-module integration tests', () => {
  test('test', async () => {
    const query = { city: 'Roma' };
    const db = new FileStorage('./storage.dat');

    const cursor = db.select(query);

    const result = [];

    for await (const record of cursor) {
      result.push(record);
    }

    assert.deepStrictEqual(result, mockData);
  });
});
