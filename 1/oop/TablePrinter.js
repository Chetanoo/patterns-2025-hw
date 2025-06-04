'use strict';

const { padOffset } = require('../constants');

class TablePrinter {
  padValues;
  constructorInstance;

  constructor(instance) {
    this.constructorInstance = instance;
  }

  #calculatePadValues() {
    const table = this.constructorInstance.getTableData();
    this.padValues = Array(table[0]?.length).fill(0);
    for (let i = 0; i < table.length; i++) {
      const row = table[i];
      for (let j = 0; j < table[i].length; j++) {
        if (row[j].length > this.padValues[j]) {
          this.padValues[j] = row[j].length + padOffset;
        }
      }
    }
  }

  printTableWithPaddings() {
    this.#calculatePadValues();
    const table = this.constructorInstance.getTableData();
    const headers = this.constructorInstance.getTableHeaders();
    const headersToPrint = headers.map(
      (val, index) => val.padEnd(this.padValues[index]),
    ).join('');
    console.log(headersToPrint);
    for (const row of table) {
      const rowPrintValue = row.map(
        (val, index) => val.padEnd(this.padValues[index]),
      ).join('');
      console.log(rowPrintValue);
    }
    return this;
  }
}

module.exports = TablePrinter;
