'use strict'

type Row = string[];
type Table = Row[];
type PadValues = number[];
type InputData = string;

const data: InputData;
function parseDataStringIntoTable(data: InputData): Table
function calculatePadValues(table: Table): PadValues
function sortTableByColumn(table: Table, columnIndex: number): Table
function addPercentageOfMaxDensity(table: Table): void
function printTable(table: Table, padValues: PadValues): void
function main(data: InputData): void

module.exports = {
  data,
  calculatePadValues,
  sortTableByColumn,
  addPercentageOfMaxDensity,
  printTable,
  main,
  parseDataStringIntoTable
}
