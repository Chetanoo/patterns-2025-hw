interface DataRecord {
  city: string;
  name: string;
}

type QueryType = Record<string, string>;

declare abstract class Database {
  abstract select(query: QueryType): Cursor;
}

declare abstract class Cursor<T> implements AsyncIterable<T>{
  protected current: number;
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface StreamProvider {
  stream: NodeJS.ReadableStream;
}


declare class LineCursor extends Cursor<DataRecord> {
  constructor(storage: StreamProvider, query: QueryType);
}

declare class FileStorage extends Database {
  constructor(fileName: string);
  select(query: QueryType): LineCursor;
}

export {
  Database,
  Cursor,
  LineCursor,
  FileStorage
}
