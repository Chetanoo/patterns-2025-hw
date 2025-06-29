'use strict';

const { densityIndex, padOffset } = require('../constants');
const { tableString: data } = require('../mocks');

const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input);

const parseData = (data) => {
  const [
    headers,
    ...table
  ] = data.split('\n').map((line) => line.trim().split(','));
  return [headers, table];
};

const processDensity = ([headers, table]) => {
  const maxDensity = Math.max(...table.map((row) => Number(row[densityIndex])));
  const updatedHeaders = [...headers, 'percentage of max density'];

  const updatedTable = table.map((row) => {
    const density = Number(row[densityIndex]);
    const percentageOfMaxDensity = Math.round(
      (density * 100) / maxDensity).toString();
    return [...row, percentageOfMaxDensity];
  });

  return [updatedHeaders, updatedTable];
};

const sortTable = ([headers, table]) => {
  const sortedTable = table.toSorted(
    (r1, r2) => parseInt(r2[densityIndex]) - parseInt(r1[densityIndex]),
  );
  return [headers, sortedTable];
};

const calculatePaddings = ([headers, table]) => {
  const padValues = Array(headers.length).fill(0);

  for (const row of [headers, ...table]) {
    for (let i = 0; i < row.length; i++) {
      if (row[i].length > padValues[i]) {
        padValues[i] = row[i].length + padOffset;
      }
    }
  }

  return [headers, table, padValues];
};

const addPadding = ([headers, table, padValues]) => {
  const padRow = (row) => row.map(
    (value, index) => value.padEnd(padValues[index]),
  );
  const paddedHeaders = padRow(headers);
  const paddedTable = table.map(padRow);
  return [paddedHeaders, paddedTable];
};

const printTable = ([headers, table]) => {
  if (headers.length) {
    console.log(headers.join(''));
  }
  for (const row of table) {
    console.log(row.join(''));
  }
};

const main = pipe(
  parseData,
  processDensity,
  sortTable,
  calculatePaddings,
  addPadding,
  printTable,
);

main(data);

module.exports = {
  parseData,
  processDensity,
  sortTable,
  calculatePaddings,
  addPadding,
  printTable,
  pipe,
};
