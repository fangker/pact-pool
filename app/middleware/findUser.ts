import { Context } from 'egg';
import { verify } from 'jsonwebtoken';

export default () => {
  return async function findUser(ctx: Context, next: () => void) {
    if (ctx.user) {
      return next();
    }

    const a = ctx.get('Authorization');
    if (!a) {
      return next();
    }

    const [, token] = a.split(' ');
    try {
      const payload = verify(token, ctx.app.config.passportJwt.secret) as any;
      ctx.logger.debug(payload);
      if (payload && payload.uid) {
        const user = await ctx.service.user.findById(payload.uid);
        if (user) {
          ctx.user = user;
          ctx.userId = user.id;
          ctx.jwtPayload = payload;
        }
      }
    } catch (err) {
      // nothing
      return ctx.throw(400, '授权失败')
    }

    await next();
  };
};
