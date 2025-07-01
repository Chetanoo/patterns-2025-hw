'use strict';

const assert = require('node:assert');
const { describe, test } = require('node:test');

const {
  Cursor,
  Database,
  FileStorage,
} = require('./2-module.js');

const { mockData } = require('./mocks');

describe('2-module unit tests', () => {
  test('Database should throw error when instantiated', () => {
    assert.throws(
      () => new Database(),
      {
        name: 'Error',
        message: 'Abstract class should not be instantiated',
      },
    );
  });

  test('Cursor should throw error when instantiated', () => {
    assert.throws(
      () => new Cursor(),
      {
        name: 'Error',
        message: 'Abstract class should not be instantiated',
      },
    );
  });

  test('Cursor should define [Symbol.asyncIterator]', () => {
    const cursor = Object.create(Cursor.prototype);

    assert.throws(
      () => cursor[Symbol.asyncIterator](),
      {
        name: 'Error',
        message: 'Method is not implemented',
      },
    );
  });

  test('FileStorage should call FileLineCursor with inputs in method', () => {
    const query = { city: 'Roma' };
    const fileStorage = new FileStorage('./storage.dat');

    const cursor = fileStorage.select(query);

    assert.strictEqual(cursor.query, query);
  });

  test('FileLineCursor should define [Symbol.asyncIterator]', () => {
    const query = { city: 'Roma' };

    const db = new FileStorage('./storage.dat');
    const cursor = db.select(query);

    assert.strictEqual(typeof cursor[Symbol.asyncIterator], 'function');
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
