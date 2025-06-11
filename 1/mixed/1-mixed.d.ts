declare module '1-mixed' {
  type TableData = string[][];
  type Headers = string[];

  interface Table {
    getHeaders(): Headers;
    setHeaders(updatedHeaders: Headers): void;
    getTableData(): TableData;
    setTableData(updatedData: TableData): void;
  }

  export function updateTable(table: Table): void;

  export function printTable(table: Table): void;
}
