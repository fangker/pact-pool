import { app } from 'egg-mock/bootstrap';
import { testData } from './testQuestion'
import { getRepository } from 'typeorm';
import { Question } from '../../../app/entity/Question';
import { Context } from 'egg';
import * as assert from 'assert';
import { getResultRepositoryByUid } from '../../../app/entity/UserResult';

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;
  before(async () => {
    ctx = app.mockContext();
  });
  it('should ', (async () => {
    await getResultRepositoryByUid(1).delete({});
    await getRepository(Question).delete({});
    await getRepository(Question).insert(testData as any);
    let result = await ctx.service.question.getUserResultByQid(1);
    if (!result) {
      return
    }
    result = await result.fillAnswerByQid(1, [1, 2, 3], 1);
    assert(result);
  }))
});
