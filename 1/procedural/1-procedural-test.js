'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert');

const {
  parseDataString,
  calculatePadValues,
  sortTableByIntegerColumn,
  addPercentageOfMaxDensity,
} = require('./1-procedural');

const testData = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria`;

const mockHeaders = ['city', 'population', 'area', 'density', 'country'];
const mockTable = [
  ['Shanghai', '24256800', '6340', '3826', 'China'],
  ['Delhi', '16787941', '1484', '11313', 'India'],
  ['Lagos', '16060303', '1171', '13712', 'Nigeria'],
];

describe('1-procedural module tests', () => {
  test('parseDataString should correctly parse headers and table rows', () => {
    const [headers, table] = parseDataString(testData);
    assert.deepStrictEqual(
      headers, mockHeaders,
      'Headers should be parsed correctly',
    );
    assert.deepStrictEqual(
      table,
      mockTable,
      'Table rows should be parsed correctly',
    );
  });

  test('calculatePadValues should correctly calculate padding for columns',
    () => {
      const padValues = calculatePadValues(mockTable);
      const expectedPadValues = [13, 13, 9, 9, 10];
      assert.deepStrictEqual(
        padValues, expectedPadValues,
        'Pad values should be calculated correctly',
      );
    });

  test('sortTableByIntegerColumn should correctly sort table',
    () => {
      const sortedTable = sortTableByIntegerColumn(mockTable, 3);
      const expectedSortedTable = [
        ['Lagos', '16060303', '1171', '13712', 'Nigeria'],
        ['Delhi', '16787941', '1484', '11313', 'India'],
        ['Shanghai', '24256800', '6340', '3826', 'China'],
      ];
      assert.deepStrictEqual(sortedTable,
        expectedSortedTable,
        'Table should be sorted by density column',
      );
    });

  test(
    'addPercentageOfMaxDensity should add percentage column and update headers',
    () => {
    const [
      updatedHeaders,
      updatedTable,
    ] = addPercentageOfMaxDensity(mockHeaders, mockTable);

    const expectedHeaders = [...mockHeaders, 'percentage of max density'];
    const expectedUpdatedTable = [
      ['Shanghai', '24256800', '6340', '3826', 'China', '28'],
      ['Delhi', '16787941', '1484', '11313', 'India', '83'],
      ['Lagos', '16060303', '1171', '13712', 'Nigeria', '100'],
    ];

    assert.deepStrictEqual(
      updatedHeaders,
      expectedHeaders,
      'Headers should include the new column',
    );

    assert.deepStrictEqual(
      updatedTable,
      expectedUpdatedTable,
      'Table rows should include percentages of max density',
    );
  });
});
