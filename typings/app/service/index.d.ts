// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCalculate from '../../../app/service/Calculate';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportUserBlock from '../../../app/service/UserBlock';

declare module 'egg' {
  interface IService {
    calculate: ExportCalculate;
    test: ExportTest;
    user: ExportUser;
    userBlock: ExportUserBlock;
  }
}
