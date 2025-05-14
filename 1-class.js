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
  padValues = [18, 10, 8, 8, 18, 6];

  constructor(tableString) {
    this.lines = tableString.split('\n');
    this.#createTable();
    this.#normalizeTable();
  }

  #createTable() {
    this.table = [];
    for (let i = 1; i < this.lines.length; i++) {
      const row = this.lines[i].split(',');
      this.table.push(row);
    }
    return this.table;
  }

  #normalizeTable() {
    this.table.sort((r1, r2) => r2[3] - r1[3]);
    const maxDensityValue = this.table[0][3];
    if (!maxDensityValue) return;
    for (const row of this.table) {
      const density = parseInt(row[3]);
      const percentageOfMaxDensity = Math.round(
        (density * 100) / maxDensityValue,
      );
      row.push(percentageOfMaxDensity.toString());
    }
  }

  printTable() {
    for (const row of this.table) {
      const rowPrintValue = row.reduce(
        (acc, curr, index) => acc + curr.padEnd(this.padValues[index]),
        '',
      );
      console.log(rowPrintValue);
    }
  }
}

const table = new Table(data);
table.printTable();
