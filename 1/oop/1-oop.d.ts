'use strict';

declare class Table {
  public data: string[][] | undefined;
  public headers: string[] | undefined;

  constructor(tableString: string);
}

declare class TableBuilder {
  public table: Table;

  constructor(data: string);
  getTable(): Table;
  addPercentageOfMaxDensity(): this;
  sortTableByIntegerColumn(columnIndex: number): this;
}

declare class TablePrinter {
  private padValues: number[] | undefined;
  private tableInstance: Table;

  constructor(instance: Table);
  printTableWithPaddings(): this;
}

export { Table, TableBuilder, TablePrinter };
