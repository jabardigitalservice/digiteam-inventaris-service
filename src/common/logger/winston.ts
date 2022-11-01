import winston, { createLogger } from 'winston';
import newrelicFormatter from '@newrelic/winston-enricher';
import { WinstonModule } from 'nest-winston';

const logger = {
  logger: WinstonModule.createLogger(
    createLogger({
      format: winston.format.combine(newrelicFormatter(winston)()),
      transports: [new winston.transports.Console()],
    }),
  ),
};

export default logger;
