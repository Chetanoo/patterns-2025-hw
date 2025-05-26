'use strict';

declare class Table {
  private padValues: number[] | null;
  public table: string[][] | null;
  public headers: string[] | null;
  public separator: string;
  public padOffset: number;
  constructor(tableString: string);
  sortTableByIntegerColumn(columnIndex: number): this;
  addPercentageOfMaxDensity(): this;
  printTable(): this;
}

export = Table;
