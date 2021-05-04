import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  controller: {
    enable: true,
    package: 'egg-controller',
  },
  alinode: {
    enable: false,
    package: 'egg-alinode',
  },
  aop: {
    enable: true,
    package: 'egg-aop',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};

export default plugin;
