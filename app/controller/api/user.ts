import { Controller } from 'egg';
import { controller } from 'egg-controller';
import findUser from '../../middleware/findUser';

@controller({
  name: 'question_find',
  prefix: '/api/v1/user',
  restful: true,
  middleware: [findUser],
})
export default class UserController extends Controller {
  /**
   * @api {get} /v1/user 获得用户信息
   * @apiVersion 1.0.0
   * @apiGroup User
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *     {
   *      nick: "sss";
   *      avatar: "";
   *      gender: 1;
   *     }
   */
  index() {
    const user = this.service.user.findById(this.ctx.userId);
    return {
      ...user,
    };
  }
}
