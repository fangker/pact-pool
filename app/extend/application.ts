import { Application, Singleton } from 'egg';
import { Redis } from 'ioredis';

declare module 'egg' {
  interface Application {
    getRedis(name?: string): Redis;
  }
}

export default {
  getRedis(this: Application, name = 'default') {
    return (this.redis as Singleton<Redis>).get(name);
  },
};
