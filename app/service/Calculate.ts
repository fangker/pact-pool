import { Service } from 'egg';
import { getRepository, In } from 'typeorm';
import { Block } from '../entity/Block';
import { differenceInMinutes } from 'date-fns';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { flatten } from 'lodash';
import { User } from '../entity/User';
import { getUserBlockRepositoryByUid } from '../entity/UserBlock';

interface Miner {
  active: boolean;
  shares: number;
  blocks: number;
  hashes: number;
  avgSpeed: number;
  diff: number;
  connectTime: number;
  lastContact: number;
  password: string;
  user: string;
  lastShare: number;
  coin: string;
  pool: string;
  id: string;
  identifier: string;
  ip: string;
  agent: string;
  algos: string[];
  logString: string;
}

export interface PoolBody {
  [key: string]: {
    [activeId: string]: Miner;
  };
}

export default class CalculateService extends Service {
  @Transactional()
  async saveRecords(body: PoolBody) {
    const current = new Date();
    const block = await getRepository(Block).save({
      data: body,
    });
    const miners = flatten(Object.values(body).map(a => {
      return Object.values(a);
    })) as Miner[];
    const userAddresses = miners.map(a => a.user);
    const users = await getRepository(User).find({ address: In(userAddresses) });
    for (const m of miners) {
      this.ctx.logger.info(JSON.stringify(m, null, 2));
      const min = await differenceInMinutes(current, new Date(m.lastContact));
      if (min < 2 || m.hashes < 100) {
        continue;
      }
      let user = users.find(a => a.address === m.user);
      if (!user) {
        user = await getRepository(User).save({ address: m.user });
      }
      await getUserBlockRepositoryByUid(user.id).save({
        activeId: m.id,
        userId: user.id,
        avgSpeed: String(m.avgSpeed),
        hashed: String(m.hashes),
      });
    }
    await getRepository(Block).update(block.id, {
      avgSpeed: String(miners.reduce((memo, item) => {
        memo += Number(item.avgSpeed);
        return memo;
      }, 0)),
    });
    this.ctx.logger.info('Save Records Ok!');
  }
}
