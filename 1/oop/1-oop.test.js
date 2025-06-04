'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert');
const { tableString: data } = require('../mocks');
const { densityIndex } = require('../constants');

const Table = require('./Table');
const TableConstructor = require('./TableConstructor');
const TablePrinter = require('./TablePrinter');

describe('1-oop module tests', () => {
  test('Table should parse the input string correctly', () => {
    const table = new Table(data);
    assert.strictEqual(
      table.headers?.length,
      5,
      'Headers should have the expected length',
    );
    assert.strictEqual(
      table.data?.length,
      10,
      'Data should have the expected number of rows',
    );
    assert.deepStrictEqual(
      table.headers,
      ['  city', 'population', 'area', 'density', 'country'],
      'Headers should match the expected values',
    );
  });

  test('TableConstructor should add percentage of max density correctly',
    () => {
    const tableConstructor = new TableConstructor(data);
    tableConstructor.addPercentageOfMaxDensity();
    const maxDensityRow = tableConstructor.table.data.find(
      (row) =>
        parseInt(row[densityIndex]) === Math.max(
          ...tableConstructor.table.data.map(
            (row) => parseInt(row[densityIndex]),
          ),
        ),
    );
    const lastColumnValue = parseInt(maxDensityRow[maxDensityRow.length - 1]);

    assert.strictEqual(
      tableConstructor.table.data[0].length,
      6,
      'Rows should have an additional column after adding density percentages',
    );

    assert.strictEqual(
      lastColumnValue,
      100,
      'The row with the maximum density should have 100 as the percentage',
    );
  });

  test('TableConstructor should sort rows by a numerical column', () => {
    const tableConstructor = new TableConstructor(data);
    tableConstructor.sortTableByIntegerColumn(densityIndex);
    const sortedDensities = tableConstructor.table.data.map((row) =>
      parseInt(row[densityIndex]),
    );

    assert.deepStrictEqual(
      sortedDensities,
      [...sortedDensities].sort((a, b) => b - a),
      'Rows should be sorted by the density in descending order',
    );
  });

  test('TablePrinter should calculate correct padding and print table',
    () => {
    const consoleOutput = [];
    const originalLog = console.log;
    console.log = (message) => consoleOutput.push(message);

    const tableConstructor = new TableConstructor(data);
    tableConstructor
      .addPercentageOfMaxDensity()
      .addColumnToHeaders('percentage of max density')
      .sortTableByIntegerColumn(densityIndex);

    const tablePrinter = new TablePrinter(tableConstructor);
    tablePrinter.printTableWithPaddings();

    console.log = originalLog;

    assert(
      consoleOutput.length > 0,
      'TablePrinter should produce console output',
    );
    assert(
      consoleOutput[0].includes('percentage of max density'),
      'Header should include the new percentage column',
    );
  });
});
