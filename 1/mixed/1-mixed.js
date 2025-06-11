'use strict';

const Table = require('./Table');
const { densityIndex } = require('../constants');
const { tableString: data } = require('../mocks');

const {
  sortTableByIntegerColumn,
  calculatePadValues,
  addPercentageOfMaxDensity,
} = require('./helpers');

const updateTable = (table) => {
  const [newHeaders, newData] = addPercentageOfMaxDensity(
    table.getHeaders(),
    table.getTableData(),
  );

  table.setHeaders(newHeaders);
  table.setTableData(newData);

  const sortedTableData = sortTableByIntegerColumn(
    table.getTableData(),
    densityIndex,
  );

  table.setTableData(sortedTableData);
};

const printTable = (table) => {
  const data = table.getTableData();
  const headers = table.getHeaders();

  const padValues = calculatePadValues(data);

  const headersToPrint = headers.map(
    (val, index) => val.padEnd(padValues[index]),
  ).join('');
  console.log(headersToPrint);

  for (const row of data) {
    const rowPrintValue = row.map(
      (val, index) => val.padEnd(padValues[index]),
    ).join('');
    console.log(rowPrintValue);
  }
};

const main = () => {
  const table = new Table(data);

  updateTable(table);

  printTable(table);
};

void main();

module.exports = {
  updateTable,
  printTable,
  main,
};
