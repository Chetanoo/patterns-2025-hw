'use strict';

const timeoutCollection = (interval) => {
  const collection = new Map();

  const currentTime = () => Date.now();

  const cleanup = () => {
    const now = currentTime();
    for (const [key, expiration] of collection) {
      if (expiration.time <= now) {
        collection.delete(key);
      }
    }
  };

  return {
    set: (key, value) => {
      cleanup();
      const expirationTime = currentTime() + interval;
      collection.set(key, { value, time: expirationTime });
    },
    get: (key) => {
      cleanup();
      const entry = collection.get(key);
      return entry ? entry.value : undefined;
    },
    delete: (key) => {
      cleanup();
      collection.delete(key);
    },
    toArray: () => {
      cleanup();
      return [...collection.entries().map(([key, { value }]) => [key, value])];
    },
  };
};

// Usage

const hash = timeoutCollection(1000);
hash.set('uno', 1);
console.dir({ array: hash.toArray() });

hash.set('due', 2);
console.dir({ array: hash.toArray() });

hash.get('due');

setTimeout(() => {
  hash.set('tre', 3);
  console.dir({ array: hash.toArray() });

  setTimeout(() => {
    hash.set('quattro', 4);
    console.dir({ array: hash.toArray() });
  }, 500);
}, 1500);
