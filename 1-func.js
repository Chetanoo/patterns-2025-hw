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

// const data = '';

const separator = ',';
const padOffset = 3;

function parseDataString(data) {
  if (!data) throw new Error('Please provide correct data');

  const lines = data.split('\n');

  if (!lines.length) throw new Error('The data is empty');

  const table = [];
  const headers = lines[0].split(separator);
  const padValues = Array(headers.length).fill(0);
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(separator);
    for (let j = 0; j < row.length; j++) {
      if (row[j].length > padValues[j]) {
        padValues[j] = row[j].length + padOffset;
      }
    }
    table.push(row);
  }
  return [padValues, table];
}

function sortTableByColumn(table, columnIndex) {
  if (!table?.length) return;
  table.sort((r1, r2) => r2[columnIndex] - r1[columnIndex]);
}

function addPercentageOfMaxDensity(table, padValues) {
  if (!table?.length) throw new Error('Table is not valid');
  sortTableByColumn(table, 3);
  const firstRow = table[0];
  if (!firstRow) throw new Error('Table is not valid');
  const maxDensityValue = firstRow[3];
  if (!maxDensityValue) throw new Error('Invalid value');
  let newPadValue = 0;
  for (const row of table) {
    const density = parseInt(row[3]);
    const percentageOfMaxDensity = Math.round(
      (density * 100) / maxDensityValue,
    ).toString();
    if (percentageOfMaxDensity.length > newPadValue) {
      newPadValue = percentageOfMaxDensity.length + padOffset;
    }
    row.push(percentageOfMaxDensity);
  }
  padValues.push(newPadValue);
}

function addColumn(table, callback, padValues) {
  if (!table?.length) return;
  callback(table, padValues);
}

function printTable(table, padValues) {
  if (!table?.length) throw new Error('Table is not valid');
  for (const row of table) {
    const rowPrintValue = row.reduce(
      (acc, curr, index) => acc + curr.padEnd(padValues[index]),
      '',
    );
    console.log(rowPrintValue);
  }
}

function printTableWithMaxDensityPercentage(data) {
  try {
    const [padValues, table] = parseDataString(data);
    addColumn(
      table,
      addPercentageOfMaxDensity,
      padValues,
    );
    printTable(table, padValues);
  } catch (e) {
    console.log({ error: e.message });
  }
}

printTableWithMaxDensityPercentage(data);
