'use strict';

const { padOffset } = require('../constants');

class TablePrinter {
  padValues;
  tableInstance;

  constructor(instance) {
    this.tableInstance = instance;
  }

  #calculatePadValues() {
    const data = this.tableInstance.data;
    this.padValues = Array(data[0]?.length).fill(0);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < data[i].length; j++) {
        if (row[j].length > this.padValues[j]) {
          this.padValues[j] = row[j].length + padOffset;
        }
      }
    }
  }

  printTableWithPaddings() {
    this.#calculatePadValues();
    const { data, headers } = this.tableInstance;
    const headersToPrint = headers.map(
      (val, index) => val.padEnd(this.padValues[index]),
    ).join('');
    console.log(headersToPrint);
    for (const row of data) {
      const rowPrintValue = row.map(
        (val, index) => val.padEnd(this.padValues[index]),
      ).join('');
      console.log(rowPrintValue);
    }
    return this;
  }
}

module.exports = TablePrinter;
