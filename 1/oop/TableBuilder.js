'use strict';

const { densityIndex } = require('../constants');
const Table = require('./Table');

class TableBuilder {
  table;

  constructor(data) {
    this.table = new Table(data);
  }

  getTable() {
    return this.table;
  }

  addPercentageOfMaxDensity() {
    if (!this.table.data.length) return this;

    let maxDensity = -Infinity;
    for (let i = 0; i < this.table.data.length; i++) {
      const density = Number(this.table.data[i][densityIndex]);
      if (density > maxDensity) maxDensity = density;
    }


    for (const row of this.table.data) {
      const density = Number(row[densityIndex]);
      const percentageOfMaxDensity = Math.round(
        (density * 100) / maxDensity,
      ).toString();
      row.push(percentageOfMaxDensity);
    }

    this.table.headers.push('percentage of max density');
    return this;
  }

  sortTableByIntegerColumn(columnIndex) {
    this.table.data.sort(
      (r1, r2) => Number(r2[columnIndex]) - Number(r1[columnIndex]),
    );
    return this;
  }
}

module.exports = TableBuilder;
