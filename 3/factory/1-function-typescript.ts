'use strict';

const COLORS = {
  warning: '\x1b[1;33m',
  error: '\x1b[0;31m',
  info: '\x1b[1;37m',
};

type LevelType = keyof typeof COLORS
type ColorType = typeof COLORS[LevelType];

type OptionsType = { level: LevelType } | { color: ColorType };

const logger = (options: OptionsType) => (message: string) => {
  const date = new Date().toISOString();

  let color: string;

  if ('level' in options) {
    color = COLORS[options.level];
  } else {
    color = options.color;
  }

  console.log(`${color}${date}\t${message}`);
};

const warning = logger({level: 'warning'});
warning('Hello warning');

const error = logger({level: 'error'});
error('Hello error');

const info = logger({color: '\x1b[1;37m'});
info('Hello info');
