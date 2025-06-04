'use strict';

const { densityIndex } = require('../constants');
const Table = require('./Table');

class TableConstructor {
  table;

  constructor(data) {
    this.table = new Table(data);
  }

  getTableData() {
    return this.table?.data;
  }

  getTableHeaders() {
    return this.table?.headers;
  }

  addPercentageOfMaxDensity() {
    if (!this.table?.data.length) return this;

    const maxDensityValue = ((table) => {
      let maxDensity = -Infinity;
      for (let i = 0; i < table.length; i++) {
        const density = parseInt(table[i][densityIndex]);
        if (density > maxDensity) maxDensity = density;
      }
      return maxDensity;
    })(this.table.data);

    for (const row of this.table.data) {
      const density = parseInt(row[densityIndex]);
      const percentageOfMaxDensity = Math.round(
        (density * 100) / maxDensityValue,
      ).toString();
      row.push(percentageOfMaxDensity);
    }
    return this;
  }

  addColumnToHeaders(columnName) {
    this.table?.headers.push(columnName);
    return this;
  }

  sortTableByIntegerColumn(columnIndex) {
    this.table?.data.sort(
      (r1, r2) => parseInt(r2[columnIndex]) - parseInt(r1[columnIndex]),
    );
    return this;
  }
}

module.exports = TableConstructor;
