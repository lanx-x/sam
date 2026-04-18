type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const VALID_LEVELS = new Set<string>(Object.keys(LEVELS));

const envLevel = process.env.LOG_LEVEL?.toLowerCase();
const MIN_LEVEL: LogLevel = VALID_LEVELS.has(envLevel ?? '')
  ? (envLevel as LogLevel)
  : (() => {
    if (envLevel !== undefined) {
      console.warn(
        `[logger] Invalid LOG_LEVEL "${process.env.LOG_LEVEL}", expected one of: ${[...VALID_LEVELS].join(', ')}. Defaulting to "info".`
      );
    }
    return 'info' as const;
  })();

const MIN = LEVELS[MIN_LEVEL];

const COLORS: Record<LogLevel, string> = {
  debug: '\x1b[90m',
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};
const RESET = '\x1b[0m';

const pad = (n: number) => String(n).padStart(2, '0');
const fmtTime = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`;

const noop = (..._args: unknown[]) => { };

function createLog(level: LogLevel, weight: number) {
  if (weight < MIN) return noop;
  const tag = `${COLORS[level]}${level}${RESET}`;
  const out =
    level === 'error'
      ? console.error
      : level === 'warn'
        ? console.warn
        : console.log;
  return (...args: unknown[]) => out(`[${fmtTime(new Date())}]`, tag, ...args);
}

export const logger = {
  debug: createLog('debug', LEVELS.debug),
  info: createLog('info', LEVELS.info),
  warn: createLog('warn', LEVELS.warn),
  error: createLog('error', LEVELS.error),
};
