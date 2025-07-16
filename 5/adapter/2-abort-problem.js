'use strict';

// Task: implement cancellation by passing `AbortSignal` as an option
// to the promisified function (last argument, replacing the callback).
// Hint: Create `AbortController` or `AbortSignal` in the usage section.

const promisify =
  (fn) =>
  (...args) => {
    const abortSignal = args.pop();
    return new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new Error('Aborted'));
      };

      if (abortSignal.aborted) {
        onAbort();
      }

      abortSignal.addEventListener('abort', onAbort, { once: true });

      const cleanup = () => {
        abortSignal.removeEventListener('abort', onAbort);
      };

      const callback = (err, data) => {
        if (abortSignal.aborted) return;
        cleanup();
        if (err) reject(err);
        else resolve(data);
      };

      fn(...args, callback);
    });
  };

// Usage

const fs = require('node:fs');
const read = promisify(fs.readFile);

const main = async () => {
  const fileName = '1-promisify.js';
  const abortController = new AbortController();
  const data = await read(fileName, 'utf8', abortController.signal);
  console.log(`File "${fileName}" size: ${data.length}`);
};

main();
