'use strict';

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

class Table {
  padValues = null;
  table = null;
  headers = null;
  separator = ',';
  padOffset = 5;

  constructor(tableString) {
    this.#parseDataString(tableString);
  }

  #parseDataString(data) {
    this.table = [];

    const lines = data.split('\n');

    if (lines[1].trim() !== lines[1]) {
      lines[0] = '  ' + lines[0];
    }

    this.headers = lines[0].split(this.separator);
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(this.separator);
      this.table.push(row);
    }

    return this;
  }

  #calculatePadValues() {
    this.padValues = Array(this.table[0]?.length).fill(0);
    for (let i = 0; i < this.table.length; i++) {
      const row = this.table[i];
      for (let j = 0; j < this.table[i].length; j++) {
        if (row[j].length > this.padValues[j]) {
          this.padValues[j] = row[j].length + this.padOffset;
        }
      }
    }
  }

  sortTableByIntegerColumn(columnIndex) {
    this.table.sort(
      (r1, r2) => parseInt(r2[columnIndex]) - parseInt(r1[columnIndex]),
    );
    return this;
  }

  addPercentageOfMaxDensity() {
    if (!this.table?.length) return this;
    this.sortTableByIntegerColumn(3);
    const firstRow = this.table[0];
    const maxDensityValue = parseInt(firstRow[3]);
    for (const row of this.table) {
      const density = parseInt(row[3]);
      const percentageOfMaxDensity = Math.round(
        (density * 100) / maxDensityValue,
      ).toString();
      row.push(percentageOfMaxDensity);
    }
    return this;
  }

  printTable() {
    this.#calculatePadValues();
    const headersToPrint = this.headers.map(
      (val, index) => val.padEnd(this.padValues[index]),
    ).join('');
    console.log(headersToPrint);
    for (const row of this.table) {
      const rowPrintValue = row.map(
        (val, index) => val.padEnd(this.padValues[index]),
      ).join('');
      console.log(rowPrintValue);
    }
    return this;
  }
}



const table = new Table(data);
table
  .addPercentageOfMaxDensity()
  .printTable();
