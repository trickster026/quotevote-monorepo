import sinon from 'sinon';
import { expect } from 'chai';
import UserModel from '~/resolvers/models/UserModel';
import { getUsers } from '~/resolvers/queries/user';

const usersData = [
  {
    _id: '59b003750e3766041440171f',
  },
  {
    _id: '59b006a2dba5fb0027f48c76',
  },
  {
    _id: '5a8021eaf0b7f71bc8c6dbdc',
  },
];

describe('Queries > user > getUsers', () => {
  let usersModelStub;

  beforeEach(() => {
    usersModelStub = sinon.stub(UserModel, 'find');
  });

  afterEach(() => {
    usersModelStub.restore();
  });

  it('should return all users', async () => {
    usersModelStub.resolves(usersData);
    const result = await getUsers()(undefined, {}, undefined);
    expect(usersData).is.equal(result);
    sinon.assert.called(usersModelStub);
  });
});
