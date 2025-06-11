'use strict';

const { describe, test, beforeEach } = require('node:test');
const assert = require('node:assert');
const { tableString: data } = require('../mocks');
const { densityIndex } = require('../constants');
const Table = require('./Table');
const { updateTable, printTable } = require('./1-mixed');

describe('Mixed tests', () => {
  let table;

  beforeEach(() => {
    table = new Table(data);
  });

  test('updateTable should add percentage column and sort correctly', () => {
    const originalHeaders = table.getHeaders();
    const originalData = table.getTableData();

    updateTable(table);

    assert.strictEqual(
      table.getHeaders().length,
      originalHeaders.length + 1,
      'Headers should include a new percentage column',
    );

    const newData = table.getTableData();
    assert.strictEqual(
      newData[0].length,
      originalData[0].length + 1,
      'Each row should have a new percentage column',
    );

    const densityValues = newData.map((row) => Number(row[densityIndex]));
    const sortedDensityValues = [...densityValues].sort((a, b) => b - a);
    assert.deepStrictEqual(
      densityValues,
      sortedDensityValues,
      'Rows should be sorted by density in descending order',
    );
  });

  test('printTable should format and log table correctly', () => {
    const mockConsoleOutput = [];
    const mockLog = (output) => mockConsoleOutput.push(output);
    const originalConsoleLog = console.log;
    console.log = mockLog;

    try {
      printTable(table);
    } finally {
      console.log = originalConsoleLog;
    }

    assert(
      mockConsoleOutput.length > 0,
      'Console output should not be empty',
    );

    const headersLogged = mockConsoleOutput[0];
    assert.strictEqual(
      headersLogged.includes(table.getHeaders()[0]),
      true,
      'Headers should be logged as the first row',
    );
  });
});
