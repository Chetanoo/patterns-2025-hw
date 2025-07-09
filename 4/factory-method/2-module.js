'use strict';
///<reference path="2-module.d.ts" />

const fs = require('node:fs');
const readline = require('node:readline');
const path = require('node:path');

class Database {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === Database) {
      throw new Error('Abstract class should not be instantiated');
    }
  }

  select() {
    throw new Error('Method is not implemented');
  }
}

class Cursor {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === Cursor) {
      throw new Error('Abstract class should not be instantiated');
    }
    this.current = 0;
  }

  [Symbol.asyncIterator]() {
    throw new Error('Method is not implemented');
  }
}

class LineCursor extends Cursor {
  constructor(storage, query) {
    super();
    this.query = query;
    this.lines = readline
      .createInterface({
        input: storage.stream,
        crlfDelay: Infinity,
      })
      [Symbol.asyncIterator]();
  }

  [Symbol.asyncIterator]() {
    const cursor = this;
    return {
      async next() {
        do {
          const { value, done } = await cursor.lines.next();
          if (done) return { done: true };
          cursor.current++;
          const data = JSON.parse(value);
          let condition = true;
          const { query } = cursor;
          for (const field in query) {
            condition = condition && data[field] === query[field];
          }
          if (condition) return { value: data, done: false };
        } while (true);
      },
    };
  }
}

class Storage extends Database {
  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.stream = fs.createReadStream(path.join(__dirname, fileName));
  }

  select(query) {
    return new LineCursor(this, query);
  }
}

module.exports = {
  Database,
  Cursor,
  LineCursor,
  Storage,
};
