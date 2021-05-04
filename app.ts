import 'reflect-metadata';
import { Application, IBoot } from 'egg';
import { createConnection, Connection } from 'typeorm';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import Hashids from 'hashids';
import * as datefns from 'date-fns';

export default class FooBoot implements IBoot {
  private readonly app: Application;
  private connect: Connection;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    const { app } = this;
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    this.connect = await createConnection(this.app.config.typeormConnections);
    app.hashids = new Hashids(app.config.hsahids.salt, 8, 'ABCDEFGHJKLMNPQRSTUVWXYZ1234567890');
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
    const { app } = this;
    app.locals = { datefns };
    // 验证启动状态
    await this.connect.query('show tables');
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
