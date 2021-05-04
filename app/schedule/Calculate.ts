import { Context } from 'egg';
import { PoolBody } from '../service/Calculate';

export default function CalculateSchedule() {
  return {
    schedule: {
      cron: '0 */5 * * * *',
      type: 'all',
      immediate: true,
    },
    async task(ctx: Context) {
      // const lockkey = 'schedule:calculate';
      // const ok = await ctx.app.getRedis().set(lockkey, '1', 'NX', 'EX', 60);
      // if (!ok) return;
      const res = await ctx.app.curl(ctx.app.config.poolHost);
      const body = JSON.parse(res.data.toString());
      await ctx.service.calculate.saveRecords(body as PoolBody);
    },
  };
}
