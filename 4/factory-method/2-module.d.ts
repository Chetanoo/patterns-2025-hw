type QueryType = Record<string, string>;

declare abstract class Database {
  abstract select(query: QueryType): Cursor;
}

declare abstract class Cursor implements AsyncIterable<any>{
  protected current: number;
  [Symbol.asyncIterator](): AsyncIterator<any>;
}

declare class LineCursor extends Cursor {
  constructor(storage: Storage, query: QueryType);
}

declare class Storage extends Database {
  constructor(fileName: string);
  select(query: QueryType): LineCursor;
}

export {
  Database,
  Cursor,
  LineCursor,
  Storage
}
