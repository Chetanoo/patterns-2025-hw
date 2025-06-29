'use strict';

// Tasks for rewriting:
//   - Watch week 1 lectures about SoC, SRP, code characteristics, V8
//   - Apply optimizations of computing resources: processor, memory
//   - Minimize cognitive complexity
//   - Respect SRP and SoC
//   - Improve readability (understanding), reliability
//   - Optimize for maintainability, reusability, flexibility
//   - Make code testable
//   - Implement simple unittests without frameworks
// Additional tasks:
//   - Try to implement in multiple paradigms: OOP, FP, procedural, mixed
//   - Prepare load testing and trace V8 deopts

const { tableString: data } = require('../mocks');
const { separator, padOffset, densityIndex } = require('../constants');

function parseDataString(data) {
  const lines = data.split('\n');

  const headers = lines[0].split(separator);
  const table = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].trim().split(separator);
    table.push(row);
  }
  return [headers, table];
}

function calculatePadValues(table) {
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
}

function sortTableByIntegerColumn(table, columnIndex) {
  return table.toSorted(
    (r1, r2) => parseInt(r2[columnIndex]) - parseInt(r1[columnIndex]),
  );
}

function addPercentageOfMaxDensity(headers, table) {
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
}

function printTable(table, padValues, headers) {
  if (headers?.length) {
    const headersToPrint = headers.map(
      (val, index) => val.padEnd(padValues[index]),
    ).join('');
    console.log(headersToPrint);
  }
  for (const row of table) {
    const rowPrintValue = row.map(
      (val, index) => val.padEnd(padValues[index]),
    ).join('');
    console.log(rowPrintValue);
  }
}

function main(data) {
  try {
    const [headers, table] = parseDataString(data);

    const sortedTable = sortTableByIntegerColumn(table, densityIndex);
    const [
      headersWithPercentage,
      tableWithPercentage,
    ] = addPercentageOfMaxDensity(headers, sortedTable);

    const padValues = calculatePadValues(tableWithPercentage);

    printTable(tableWithPercentage, padValues, headersWithPercentage);
  } catch (e) {
    console.log({ error: e.message });
  }
}

main(data);

module.exports = {
  parseDataString,
  calculatePadValues,
  sortTableByIntegerColumn,
  addPercentageOfMaxDensity,
};
