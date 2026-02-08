const logger = {
  info: (...args) => {
    console.log({ level: "info", timestamp: new Date().toISOString() }, args);
  },
  error: (...args) => {
    console.log({ level: "error", timestamp: new Date().toISOString() }, args);
  },
  warn: (...args) => {
    console.log({ level: "warn", timestamp: new Date().toISOString() }, args);
  },
};

module.exports = { logger };
