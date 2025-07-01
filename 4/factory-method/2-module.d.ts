type QueryType = Record<string, string>;

declare abstract class Database {
  protected constructor();
  abstract select(query: QueryType): Cursor;
}

declare abstract class Cursor implements AsyncIterable<any>{
  protected constructor();
}

declare class FileLineCursor extends Cursor {
  constructor(fileStorage: FileStorage, query: QueryType);
}

declare class FileStorage extends Database {
  constructor(fileName: string);
  select(query: QueryType): FileLineCursor;
}

export {
  Database,
  Cursor,
  FileLineCursor,
  FileStorage
}
