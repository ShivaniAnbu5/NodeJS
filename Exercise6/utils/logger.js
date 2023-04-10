const { createLogger, format, transports,config } = require('winston');

const errorLogConfiguration = {
transports:
    new transports.File({
    filename: 'logs/error.log',
    level: "error",
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
};

const infoLogConfiguration={
    transports:
        new transports.File({
        filename: 'logs/info.log',
        level: "info",
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
 };

 const infoLogger = createLogger(infoLogConfiguration); 

 const errorLogger = createLogger(errorLogConfiguration); 

module.exports = {errorLogger,infoLogger}