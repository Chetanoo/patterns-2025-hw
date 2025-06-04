'use strict';

declare class Table {
  public data: string[][] | undefined;
  public headers: string[] | undefined;

  constructor(tableString: string);
}

declare class TableConstructor {
  public table: Table;

  constructor(data: string);
  addPercentageOfMaxDensity(): this;
  sortTableByIntegerColumn(columnIndex: number): this;
}

declare class TablePrinter {
  private padValues: number[] | undefined;
  private constructorInstance: TableConstructor;

  constructor(instance: TableConstructor);
  printTableWithPaddings(): this;
}

export { Table, TableConstructor, TablePrinter };
