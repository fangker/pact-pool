import { Service } from 'egg';

export default class UserService extends Service {
  async saveBlockData(userId: number) {
    console.log(userId);
  }
}
