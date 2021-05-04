import { Context } from 'egg';

export default () => {
  return async function requestLogMiddleware(ctx: Context, next: () => Promise<any>) {
    ctx.logger.info('begin');
    await next();
    ctx.logger.info('end', ctx.status);
  };
};
