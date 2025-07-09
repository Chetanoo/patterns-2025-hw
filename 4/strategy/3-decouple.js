'use strict';

const RENDERERS = {
  abstract: () => 'Not implemented',

  console: (data) => {
    const keys = Object.keys(data[0]);
    const rows = data.map((row) =>
      keys.map((key) => row[key] || '').join(' | '),
    );
    const header = keys.join(' | ');
    const separator = keys.map(() => '---').join(' | ');

    return [header, separator, ...rows].join('\n');
  },

  web: (data) => {
    const keys = Object.keys(data[0]);
    const line = (row) =>
      '<tr>' + keys.map((key) => `<td>${row[key]}</td>`).join('') + '</tr>';
    const output = [
      '<table><tr>',
      keys.map((key) => `<th>${key}</th>`).join(''),
      '</tr>',
      data.map(line).join(''),
      '</table>',
    ];
    return output.join('');
  },

  markdown: (data) => {
    const keys = Object.keys(data[0]);
    const line = (row) =>
      '|' + keys.map((key) => `${row[key]}`).join('|') + '|\n';
    const output = [
      '|',
      keys.map((key) => `${key}`).join('|'),
      '|\n',
      '|',
      keys.map(() => '---').join('|'),
      '|\n',
      data.map(line).join(''),
    ];
    return output.join('');
  },
};

const selectStrategy = (strategy, name) => {
  const rendererKey = name in strategy;
  return rendererKey
    ? (data) => strategy[name](data)
    : (data) => strategy.abstract(data);
};

// Usage

const png = selectStrategy(RENDERERS, 'png');
const con = selectStrategy(RENDERERS, 'console');
const web = selectStrategy(RENDERERS, 'web');
const mkd = selectStrategy(RENDERERS, 'markdown');

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

console.group('Unknown Strategy:');
console.log(png(persons));
console.groupEnd();

console.group('\nConsoleRenderer:');
console.log(con(persons));
console.groupEnd();

console.group('\nWebRenderer:');
console.log(web(persons));
console.groupEnd();

console.group('\nMarkdownRenderer:');
console.log(mkd(persons));
console.groupEnd();
