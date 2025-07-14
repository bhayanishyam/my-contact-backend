import { createLogger, format, transports } from "winston"
const { timestamp, combine, json, colorize } = format


// Custom format for console logging with colorize
const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, timestamp }) => {
        return `${level} : ${message}`
    })
);

const logger = createLogger({
    level: "info",
    format: combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console({
            format: consoleLogFormat
        }),
        new transports.File({ filename: 'app.log' })
    ],
})

export default logger;