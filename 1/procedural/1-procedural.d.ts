'use strict';

type Row = string[];
type Table = Row[];
type PadValues = number[];
type InputData = string;

declare function parseDataString(data: InputData): [Row, Table];
declare function calculatePadValues(table: Table): PadValues;
declare function sortTableByIntegerColumn(
  table: Table,
  columnIndex: number
): Table;
declare function addPercentageOfMaxDensity(
  headers: Row,
  table: Table
): [Row, Table];

export = {
  parseDataString,
  calculatePadValues,
  sortTableByIntegerColumn,
  addPercentageOfMaxDensity,
};
