'use strict';

const { separator } = require('../constants');

class Table {
  data;
  headers;

  constructor(tableString) {
    this.#parseDataString(tableString);
  }

  #parseDataString(data) {
    this.data = [];

    const lines = data.split('\n');

    this.headers = lines[0].split(separator);
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].trim().split(separator);
      this.data.push(row);
    }

    return this;
  }
}

module.exports = Table;
