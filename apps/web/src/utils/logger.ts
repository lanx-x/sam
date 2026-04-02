type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL = (process.env.LOG_LEVEL as LogLevel) || 'debug';

function log(level: LogLevel, ...args: unknown[]) {
  if (LEVELS[level] < LEVELS[MIN_LEVEL]) return;
  const tag = `[${level.toUpperCase()}]`;
  if (level === 'error') {
    console.error(tag, ...args);
  } else if (level === 'warn') {
    console.warn(tag, ...args);
  } else {
    console.log(tag, ...args);
  }
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
};
