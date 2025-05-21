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

const separator = ',';
const padOffset = 3;

function parseDataStringIntoTable(data) {
  if (!data) throw new Error('Please provide correct data');

  const lines = data.split('\n');

  if (!lines.length) throw new Error('The data is empty');

  const table = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(separator);
    table.push(row);
  }
  return table;
}

function calculatePadValues(table) {
  if (!table?.length) throw new Error('Table is empty');
  const padValues = Array(table[0].length).fill(0);
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

function sortTableByColumn(table, columnIndex) {
  return table.toSorted(
    (r1, r2) => r2[columnIndex].localeCompare(r1[columnIndex]),
  );
}

function addPercentageOfMaxDensity(table) {
  if (!table?.length) throw new Error('Table is not valid');
  sortTableByColumn(table, 3);
  const firstRow = table[0];
  if (!firstRow) throw new Error('Table is not valid');
  const maxDensityValue = parseInt(firstRow[3]);
  if (!maxDensityValue) throw new Error('Invalid value');
  for (const row of table) {
    const density = parseInt(row[3]);
    const percentageOfMaxDensity = Math.round(
      (density * 100) / maxDensityValue,
    ).toString();
    row.push(percentageOfMaxDensity);
  }
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

function main(data) {
  try {
    const table = parseDataStringIntoTable(data);
    const padValues = calculatePadValues(table);
    addPercentageOfMaxDensity(table);
    printTable(table, padValues);
  } catch (e) {
    console.log({ error: e.message });
  }
}

main(data);
