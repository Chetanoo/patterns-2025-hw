declare class TimeoutCollection<K, V> {
  constructor(timeout: number);

  set(key: K, value: V): void;

  get(key: K): V | undefined;

  has(key: K): boolean;

  delete(key: K): void;

  forEach(callback: (value: V, key: K, collection: Map<K, V>) => void): void;

  clear(): void;

  toArray(): IterableIterator<[K, V]>;

  values(): IterableIterator<V>;

  entries(): IterableIterator<[K, V]>;

  keys(): IterableIterator<K>;

  [Symbol.iterator](): IterableIterator<[K, V]>;
}

export = TimeoutCollection;
