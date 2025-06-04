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

    if (lines[1].trim() !== lines[1]) {
      lines[0] = '  ' + lines[0];
    }

    this.headers = lines[0].split(separator);
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(separator);
      this.data.push(row);
    }

    return this;
  }
}

module.exports = Table;
