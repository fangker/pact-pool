import { EggAppConfig, PowerPartial } from 'egg';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqlDebugLogger } from '../app/utils/SqlDebugLogger';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  const typeormOptions: MysqlConnectionOptions = {
    type: 'mysql',
    port: 3306,
    synchronize: false,
    logging: 'all',
    logger: new SqlDebugLogger('all'),
    entities: [
      'app/entity/**/*.ts',
    ],
    subscribers: [
      'app/subscriber/**/*.ts',
    ],
    charset: 'utf8mb4',
    maxQueryExecutionTime: 100,
    connectTimeout: 1000,
    trace: true,
    extra: {
      connectionLimit: 5,
    },
  };

  config.typeormConnections = {
    type: 'mysql',
    logging: true,
    ...typeormOptions,
    replication: {
      master: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'csmaster_dev',
        password: 'Cr?Zpb2YCuAfnPqR',
      },
      slaves: [{
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'csmaster_dev',
        password: 'Cr?Zpb2YCuAfnPqR',
      }],
    },
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    allowDebugAtProd: true,
  };

  return config;
};
