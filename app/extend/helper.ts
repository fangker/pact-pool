import { endOfToday } from 'date-fns';
import { IHelper } from 'egg';

export default {
  /**
   * @return 当天剩余秒数
   */
  expireSecondsOfToday() {
    return Math.ceil((endOfToday().valueOf() - Date.now()) / 1000);
  },

  imageUrl(this: IHelper, name: string) {
    if (!name) return '';
    if (name.indexOf('http:') > -1 || name.indexOf('https:') > -1) {
      return name;
    }
    return `${this.app.config.cdn.url}${name}`;
  },
};
