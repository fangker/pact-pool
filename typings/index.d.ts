import 'egg';
import { Connection } from 'typeorm';
import Hashids from 'hashids';
import { User } from '../app/entity/User';
import { Singleton } from 'egg';
import { Redis } from 'ioredis';

declare module 'egg' {

  interface Application {
    connection: Connection;
    hashids: Hashids;
    redis: Redis | Singleton<Redis>;
  }

  interface Context {
    user: User;
    appVersion: string;
    jwtPayload: { uid: string, t: string, iat: number, exp: number };
  }
}
