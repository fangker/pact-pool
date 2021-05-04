let database: string;
let host = 'localhost';
let username = 'root';
let password: string = '';

switch (process.env.NODE_ENV as string) {
  case 'dev':
  case 'development':
    database = 'csmaster_dev';
    host = 'localhost';
    username = 'root';
    password = 'Cr?Zpb2YCuAfnPqR';
    break;
  case 'local':
  default:
    database = 'csmaster_local';
    break;
  case 'test':
    database = 'csmaster_test';
    break;
}

export = {
  type: 'mysql',
  host,
  port: 3306,
  username,
  password,
  database,
  synchronize: false,
  logging: 'all',
  entities: [
    'app/entity/**/*',
  ],
  migrations: [
    'database/migration/**/*',
  ],
  // subscribers: [
  //   //   'app/subscriber/**/*.ts',
  //   // ],
  charset: 'utf8mb4',
  cli: {
    migrationsDir: 'database/migration',
    // subscribersDir: 'app/subscriber',
    entitiesDir: 'app/entity',
  },
};
