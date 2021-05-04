import { EggAppConfig, EggAppInfo, PowerPartial, Context } from 'egg';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { RedisOptions } from 'ioredis';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576739683981_3748';

  // add your egg config in here
  config.middleware = ['requestLog'];
  const alinode: AlinodeConfig = {
    enable: false,
    appid: '',
    secret: '',
  };
  const typeormConnections: MysqlConnectionOptions = {} as any;
  // add your special config in here
  config.onerror = {
    // all(err, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = 'error';
    //   ctx.status = 500;
    // },
    accepts(ctx: Context) {
      if (ctx.url.indexOf('/api') > -1) return 'json';
      if (ctx.get('x-requested-with') === 'XMLHttpRequest') return 'json';
      return 'html';
    },

    html(_: any, ctx: Context) {
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err: any, ctx: Context) {
      // json hander

      const status = err.status || 500;

      if (ctx.app.config.env === 'prod' && status >= 500) {
        // ravenCaptureException(err, ctx);
      }

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const message = status >= 500 && ctx.app.config.env === 'prod' ?
        'Internal Server Error' :
        err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: err.code || status,
        message,
      };

      ctx.status = status;
    },
  };
  // API 不需要 csrf
  config.security = {
    csrf: {
      enable: false,
      match: '/api',
    },
  };
  const hsahids = { salt: 'aDW9fWz3Y3WCM3P' };

  const bizConfig = {
    poolHost: 'http://127.0.0.1:8081/json',
    alinode,
    hsahids,
    typeormConnections,
    passportJwt: {
      secret: '6xdaDW9fWz3Y3WCM3Pc7aEYji7EUu9b74',
    },
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  const redisConfig: RedisOptions = {
    keyPrefix: 'pact:',
    host: 'localhost',
    port: 6379,
    db: 0,
    connectTimeout: 1000,
    password: '',
  };

  config.redis = {
    clients: {
      default: redisConfig,
      ratelimit: redisConfig,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

interface AlinodeConfig {
  enable: boolean;
  // default is wss://agentserver.node.aliyun.com:8080
  server?: string;
  appid: string;
  secret: string;
  error_log?: string[];
  packages?: string[];
  // seconds
  reconnectDelay?: number;
  heartbeatInterval?: number;
  reportInterval?: number;
  logdir?: string;
}
