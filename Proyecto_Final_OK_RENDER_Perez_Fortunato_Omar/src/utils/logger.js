import winston, { format } from 'winston';
import 'winston-mongodb'
import "dotenv/config";
import config from "../config.js"
const { combine, colorize, printf, timestamp } = format;

const customLevels = {
    levels: {
        error:0,
        warn:1,
        info:2,
        http:3,
        verbose:4,
        debug:5,
        silly:6
    },
    
};


const logConfigProd = {
    level: customLevels.levels,
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize({ all: true }),
        printf(({ level, timestamp, message }) => `${level}  |  ${timestamp}  |  ${message}`)
    ),
    transports: [
        new winston.transports.Console({ level: 'http' }),
        /*new winston.transports.File({
            filename: './logs/loggerHttp.log',
            level: 'http'
        }),*/
        new winston.transports.File({
            filename: './logs/loggerWarn.log',
            level: 'warn'
        }),
        winston.add(new winston.transports.MongoDB({
            options: { useUnifiedTopology: true },
            db: config.MONGO_URL,
            collection: 'logs',
            tryReconnect: true,
            level:'error'
        })),
        
    ]
};

const logConfigDev = {
    transports: [
        new winston.transports.Console({ level: 'silly' }),
        new winston.transports.File({
            filename: './logs/loggerError.log',
            level: 'error'
        }),
    ]
};


const ENV = process.argv.slice(2)[0];

let logger;

if (ENV == "prod") {
      logger = winston.createLogger(logConfigProd); 
} else {
      logger = winston.createLogger(logConfigDev);
}

export { logger }









