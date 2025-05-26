'use strict';

const assert = require('node:assert');

const {
  parseDataString,
  calculatePadValues,
  sortTableByIntegerColumn,
  addPercentageOfMaxDensity,
} = require('./1-func');

const testData = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria`;

const expectedHeaders = ['city', 'population', 'area', 'density', 'country'];
const expectedTable = [
  ['Shanghai', '24256800', '6340', '3826', 'China'],
  ['Delhi', '16787941', '1484', '11313', 'India'],
  ['Lagos', '16060303', '1171', '13712', 'Nigeria'],
];


(function testParseDataString() {
  const [headers, table] = parseDataString(testData);
  assert.deepStrictEqual(
    headers,
    expectedHeaders,
    'Headers should be parsed correctly',
  );
  assert.deepStrictEqual(
    table,
    expectedTable,
    'Table rows should be parsed correctly',
  );
  console.log('✅ parseDataString passed');
})();

(function testCalculatePadValues() {
  const padValues = calculatePadValues(expectedTable);
  const expectedPadValues = [
    13, 13, 9, 9, 10,
  ];
  assert.deepStrictEqual(
    padValues,
    expectedPadValues,
    'Pad values should be calculated correctly',
  );
  console.log('✅ calculatePadValues passed');
})();

(function testSortTableByIntegerColumn() {
  const sortedTable = sortTableByIntegerColumn(expectedTable, 3);
  const expectedSortedTable = [
    ['Lagos', '16060303', '1171', '13712', 'Nigeria'],
    ['Delhi', '16787941', '1484', '11313', 'India'],
    ['Shanghai', '24256800', '6340', '3826', 'China'],
  ];
  assert.deepStrictEqual(
    sortedTable,
    expectedSortedTable,
    'Table should be sorted by density column',
  );
  console.log('✅ sortTableByIntegerColumn passed');
})();

(function testAddPercentageOfMaxDensity() {
  const [
    updatedHeaders,
    updatedTable,
  ] = addPercentageOfMaxDensity(expectedTable, expectedHeaders);
  const expectedUpdatedHeaders = [
    ...expectedHeaders,
    'percentage of max density',
  ];
  const expectedUpdatedTable = [
    ['Lagos', '16060303', '1171', '13712', 'Nigeria', '100'],
    ['Delhi', '16787941', '1484', '11313', 'India', '83'],
    ['Shanghai', '24256800', '6340', '3826', 'China', '28'],
  ];
  assert.deepStrictEqual(
    updatedHeaders,
    expectedUpdatedHeaders,
    'Headers should include the new column',
  );
  assert.deepStrictEqual(
    updatedTable,
    expectedUpdatedTable,
    'Table rows should include percentages of max density',
  );
  console.log('✅ addPercentageOfMaxDensity passed');
})();



