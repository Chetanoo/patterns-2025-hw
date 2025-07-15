'use strict';

// Task: implement a cancelable promise by passing `timeout: number`
// as an option to the promisified function (last argument,
// replacing the callback).

const promisify =
  (fn) =>
  (...args) => {
    const ms = args.pop();
    let timedOut = false;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        timedOut = true;
        reject(new Error(`Timeout`));
      }, ms);
      const callback = (err, data) => {
        if (timedOut) return;
        clearTimeout(timeout);
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
  const data = await read(fileName, 'utf8', 1000);
  console.log(`File "${fileName}" size: ${data.length}`);
};

void main();
