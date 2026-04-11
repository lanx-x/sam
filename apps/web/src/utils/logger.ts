type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL = (process.env.LOG_LEVEL as LogLevel) || 'debug';

const COLORS: Record<LogLevel, string> = {
  debug: '\x1b[90m',  // gray
  info: '\x1b[36m',   // cyan
  warn: '\x1b[33m',   // yellow
  error: '\x1b[31m',  // red
};
const RESET = '\x1b[0m';

function log(level: LogLevel, ...args: unknown[]) {
  if (LEVELS[level] < LEVELS[MIN_LEVEL]) return;
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const timestamp = `[${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${String(now.getMilliseconds()).padStart(3, '0')}]`;
  const tag = `${level}`;
  const color = COLORS[level];
  if (level === 'error') {
    console.error(timestamp, `${color}${tag}${RESET}`, ...args);
  } else if (level === 'warn') {
    console.warn(timestamp, `${color}${tag}${RESET}`, ...args);
  } else {
    console.log(timestamp, `${color}${tag}${RESET}`, ...args);
  }
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
};
