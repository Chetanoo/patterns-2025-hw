'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert');
const { tableString: data } = require('../mocks');
const { densityIndex } = require('../constants');

const Table = require('./Table');
const TableBuilder = require('./TableBuilder');
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
      ['city', 'population', 'area', 'density', 'country'],
      'Headers should match the expected values',
    );
  });

  test('TableBuilder should add percentage of max density correctly', () => {
    const tableBuilder = new TableBuilder(data);
    tableBuilder.addPercentageOfMaxDensity();
    const table = tableBuilder.getTable();
    const maxDensityRow = table.data.find(
      (row) =>
        Number(row[densityIndex]) === Math.max(
          ...table.data.map((row) => Number(row[densityIndex])),
        ),
    );
    const lastColumnValue = Number(maxDensityRow.at(-1));

    assert.strictEqual(
      table.data[0]?.length,
      6,
      'Rows should have an additional column after adding density percentages',
    );

    assert.strictEqual(
      lastColumnValue,
      100,
      'The row with the maximum density should have 100 as the percentage',
    );
  });

  test('TableBuilder should sort rows by a numerical column', () => {
    const tableBuilder = new TableBuilder(data);
    tableBuilder.sortTableByIntegerColumn(densityIndex);
    const table = tableBuilder.getTable();
    const sortedDensities = table.data.map((row) =>
      Number(row[densityIndex]),
    );

    assert.deepStrictEqual(
      sortedDensities,
      [...sortedDensities].sort((a, b) => b - a),
      'Rows should be sorted by the density in descending order',
    );
  });

  test('TablePrinter should calculate correct padding and print table', () => {
    const consoleOutput = [];
    const originalLog = console.log;
    console.log = (message) => consoleOutput.push(message);

    const tableBuilder = new TableBuilder(data);
    tableBuilder
      .addPercentageOfMaxDensity()
      .sortTableByIntegerColumn(densityIndex);

    const tablePrinter = new TablePrinter(tableBuilder.getTable());
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
