'use strict';

const { tableString: data } = require('../mocks');
const { densityIndex } = require('../constants');

const TableConstructor = require('./TableConstructor');
const TablePrinter = require('./TablePrinter');

const table = new TableConstructor(data);

table
  .addPercentageOfMaxDensity()
  .addColumnToHeaders('percentage of max density')
  .sortTableByIntegerColumn(densityIndex);

const tablePrinter = new TablePrinter(table);

tablePrinter.printTableWithPaddings();
