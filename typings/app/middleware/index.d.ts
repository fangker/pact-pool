// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFindUser from '../../../app/middleware/findUser';
import ExportRequestLog from '../../../app/middleware/requestLog';

declare module 'egg' {
  interface IMiddleware {
    findUser: typeof ExportFindUser;
    requestLog: typeof ExportRequestLog;
  }
}
