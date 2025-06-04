'use strict';

type Row = string[];
type Table = Row[];
type PadValues = number[];
type InputData = string;

declare const data: InputData;
declare function parseDataString(data: InputData): [Row, Table];
declare function calculatePadValues(table: Table): PadValues;
declare function sortTableByIntegerColumn(
  table: Table,
  columnIndex: number
): Table;
declare function addPercentageOfMaxDensity(table: Table): Table;
declare function addColumnToHeaders(headers: Row, columnName: string): Row;
declare function printTable(
  table: Table,
  padValues: PadValues,
  headers: Row
): void;
declare function main(data: InputData): void;

export = {
  data,
  parseDataString,
  calculatePadValues,
  sortTableByIntegerColumn,
  addPercentageOfMaxDensity,
  addColumnToHeaders,
  printTable,
  main,
};
