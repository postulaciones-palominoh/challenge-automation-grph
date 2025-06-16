import fs from 'fs';
import path from 'path';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, `log-${new Date().toISOString().split('T')[0]}.log`);

function writeToFile(type: 'INFO' | 'ERROR', message: string) {
  const timestamp = new Date().toLocaleString();
  const line = `[${timestamp}] [${type}] ${message}`;
  fs.appendFileSync(logFile, line + '\n', { encoding: 'utf8' });
  return line;
}

export function log(message: string) {
  const line = writeToFile('INFO', message);
  console.log(line);
}

export function logError(error: any) {
  const message = typeof error === 'string' ? error : (error.message || JSON.stringify(error));
  const line = writeToFile('ERROR', message);
  console.error(line);
}