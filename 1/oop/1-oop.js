'use strict';

const { tableString: data } = require('../mocks');
const { densityIndex } = require('../constants');

const TableBuilder = require('./TableBuilder');
const TablePrinter = require('./TablePrinter');

const tableBuilder = new TableBuilder(data);

tableBuilder
  .addPercentageOfMaxDensity()
  .sortTableByIntegerColumn(densityIndex);

const tableInstance = tableBuilder.getTable();

const tablePrinter = new TablePrinter(tableInstance);

tablePrinter.printTableWithPaddings();
