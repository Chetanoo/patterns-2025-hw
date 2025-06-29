'use strict';

const { densityIndex, padOffset } = require('../constants');

const addPercentageOfMaxDensity = (headers, table) => {
  let maxDensity = -Infinity;
  for (let i = 0; i < table.length; i++) {
    const density = parseInt(table[i][densityIndex]);
    if (density > maxDensity) maxDensity = density;
  }

  const newHeaders = [...headers, 'percentage of max density'];

  const newTable = table.map((row) => {
    const density = parseInt(row[densityIndex]);
    const percentageOfMaxDensity = Math.round(
      (density * 100) / maxDensity,
    ).toString();
    return [...row, percentageOfMaxDensity];
  });

  return [newHeaders, newTable];
};

const sortTableByIntegerColumn = (table, columnIndex) => table.toSorted(
  (r1, r2) => parseInt(r2[columnIndex]) - parseInt(r1[columnIndex]),
);

const calculatePadValues = (table) => {
  const padValues = Array(table[0]?.length).fill(0);

  for (let i = 0; i < table.length; i++) {
    const row = table[i];
    for (let j = 0; j < table[i].length; j++) {
      if (row[j].length > padValues[j]) {
        padValues[j] = row[j].length + padOffset;
      }
    }
  }

  return padValues;
};

module.exports = {
  sortTableByIntegerColumn,
  calculatePadValues,
  addPercentageOfMaxDensity,
};
