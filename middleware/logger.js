// Middleware test

// function log(req, res, next) {
//   console.log("Logging...");
//   next();
// }

// module.exports = log;

const { format, createLogger, transports } = require("winston");
const { timestamp, label, prettyPrint, json } = format;

// create formatter for dates used as timestamps
//const tsFormat = () => (new Date()).toLocaleTimeString();
// const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

const logger = createLogger({
  format: format.combine(
    // label({ label: 'right meow!' }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ssa' }),
    // prettyPrint({ colorize: true })
    // json(),
    prettyPrint()
  ),
  transports: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: 'logfile0.log' })
  ],
  exceptionHandlers: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: 'exceptions.log' })
  ]
});

module.exports = {
  logger: logger
};