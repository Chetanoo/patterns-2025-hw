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

function parseDataString(data) {
  if (!data) throw new Error('Please provide correct data');

  const lines = data.split('\n');

  if (!lines.length) throw new Error('The data is empty');

  if (lines[1].trim() !== lines[1]) {
    lines[0] = '  ' + lines[0];
  }
  const headers = lines[0].split(separator);
  const table = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(separator);
    table.push(row);
  }
  return [headers, table];
}

function calculatePadValues(table) {
  if (!table?.length) throw new Error('Table is empty');
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
  if (!table?.length) throw new Error('Table is not valid');
  if (
    !parseInt(table[0][columnIndex])
  ) throw new Error('Table cannot be sorted by that value');
  return table.toSorted(
    (r1, r2) => parseInt(r2[columnIndex]) - parseInt(r1[columnIndex]),
  );
}

function addPercentageOfMaxDensity(table, headers) {
  if (!table?.length) throw new Error('Table is not valid');
  const sortedTable = sortTableByIntegerColumn(table, 3);
  const firstRow = sortedTable[0];
  if (!firstRow) throw new Error('Table is not valid');
  const maxDensityValue = parseInt(firstRow[3]);
  if (!maxDensityValue) throw new Error('Invalid value');
  const newHeaders = [...headers, 'percentage of max density'];
  for (const row of sortedTable) {
    const density = parseInt(row[3]);
    const percentageOfMaxDensity = Math.round(
      (density * 100) / maxDensityValue,
    ).toString();
    row.push(percentageOfMaxDensity);
  }
  return [newHeaders, sortedTable];
}

function printTable(table, padValues, headers) {
  if (!table?.length) throw new Error('Table is not valid');
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
    const [
      headersWithPercentage,
      tableWithPercentage,
    ] = addPercentageOfMaxDensity(table, headers);
    const padValues = calculatePadValues(tableWithPercentage);
    printTable(tableWithPercentage, padValues, headersWithPercentage);
  } catch (e) {
    console.log({ error: e.message });
  }
}

main(data);
