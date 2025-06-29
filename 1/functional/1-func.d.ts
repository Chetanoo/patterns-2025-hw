'use strict';

type Row = string[];
type Table = Row[];
type PadValues = number[];
type InputData = string;

declare function pipe(...fns: Function[]): (input: any) => any;

declare function parseData(data: InputData): [Row, Table];

declare function processDensity([headers, table]: [Row, Table]): [Row, Table];

declare function sortTable([headers, table]: [Row, Table]): [Row, Table];

declare function calculatePaddings([headers, table]: [Row, Table]): {
  headers: Row;
  table: Table;
  padValues: PadValues;
};

declare function addPadding([
  headers,
  table,
  padValues,
]: [
  Row,
  Table,
  PadValues,
]): [Row, Table];

declare function printTable([headers, table]: [Row, Table]): void;

declare const main: Function;

export {
  pipe,
  parseData,
  processDensity,
  sortTable,
  calculatePaddings,
  addPadding,
  printTable,
  main,
};
