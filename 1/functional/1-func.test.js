'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert');

const {
  parseData,
  processDensity,
  sortTable,
  calculatePaddings,
  addPadding,
} = require('./1-func');

const { tableString } = require('../mocks');
const { densityIndex } = require('../constants');

describe('functional module tests', () => {
  test('parseData should correctly parse headers and rows', () => {
    const [headers, table] = parseData(tableString);

    assert.deepStrictEqual(
      headers,
      ['city', 'population', 'area', 'density', 'country'],
      'Headers should be parsed correctly',
    );
    assert.strictEqual(
      table.length,
      10,
      'The number of rows in the table should be 10',
    );
  });

  test('processDensity should add percentage of max density column', () => {
    const [headers, table] = parseData(tableString);
    const [updatedHeaders, updatedTable] = processDensity([headers, table]);

    assert.strictEqual(
      updatedHeaders.includes('percentage of max density'),
      true,
      'Headers should include "percentage of max density"',
    );

    assert.strictEqual(
      updatedTable[0].length,
      headers.length + 1,
      'Each row should have one more column for percentage of max density',
    );

    const maxDensity = Math.max(
      ...table.map((row) => Number(row[densityIndex])),
    );
    const maxDensityRow = updatedTable.find(
      (row) => Number(row[densityIndex]) === maxDensity,
    );
    const percentageOfMaxDensity = maxDensityRow.at(-1);
    assert.strictEqual(
      percentageOfMaxDensity,
      '100', 'Max density row should have 100%',
    );
  });

  test('sortTable should correctly sort rows by density', () => {
    const [headers, table] = parseData(tableString);
    const [, sortedTable] = sortTable([headers, table]);

    const densities = sortedTable.map((row) => Number(row[densityIndex]));
    const expectedDensities = [...densities].sort((a, b) => b - a);

    assert.deepStrictEqual(
      densities,
      expectedDensities,
      'Rows should be sorted by density in descending order',
    );
  });

  test('addPadding should apply padding correctly to headers and rows', () => {
    const [headers, table] = parseData(tableString);
    const [,, padValues] = calculatePaddings([headers, table]);
    const [paddedHeaders, paddedTable] = addPadding([
      headers,
      table,
      padValues,
    ]);

    for (let colIndex = 0; colIndex < headers.length; colIndex++) {
      assert.strictEqual(
        paddedHeaders[colIndex].length,
        padValues[colIndex],
        `Padding for header column ${colIndex} should match`,
      );

      for (const row of paddedTable) {
        assert.strictEqual(
          row[colIndex].length,
          padValues[colIndex],
          `Padding for row column ${colIndex} should match`,
        );
      }
    }
  });
});
