import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "silly",
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, stack }) => {
      const log = `[${timestamp}] ${level}: ${message}`;
      return stack ? `${log}\n${stack}` : log;
    })
  ),
});

export default logger;
