import { AdvancedConsoleLogger, QueryRunner } from 'typeorm';
import { debug } from 'debug';
import { MysqlQueryRunner } from 'typeorm/driver/mysql/MysqlQueryRunner';

let id = 0;

(MysqlQueryRunner as any).prototype.debugUniqueId = function() {
  if (typeof this.__uniqueid === 'undefined') {
    this.__uniqueid = ++id;
  }
  return this.__uniqueid;
};

export class SqlDebugLogger extends AdvancedConsoleLogger {
  // private _debugLog: debug.Debugger;

  // private get debugLog() {
  //   if (!this._debugLog) {
  //     this._debugLog = debug('app:sql');
  //   }
  //   return this._debugLog;
  // }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    // console.log((queryRunner as any).databaseConnection._internalId);
    // const id = queryRunner ? (queryRunner as any).debugUniqueId() + ' - ' : '';
    const id = queryRunner ? (queryRunner as any).databaseConnection._internalId + ' - ' : '';
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    debug('app:sql:' + id)(sql);
    // this.debugLog(id + sql);
  }
}
