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

const expectedUsersData = [
  {
    _id: '59b003750e3766041440171f',
    userId: '59b003750e3766041440171f',
  },
  {
    _id: '59b006a2dba5fb0027f48c76',
    userId: '59b006a2dba5fb0027f48c76',
  },
  {
    _id: '5a8021eaf0b7f71bc8c6dbdc',
    userId: '5a8021eaf0b7f71bc8c6dbdc',
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
    // Mock the UserModel.find to return data with _doc property like Mongoose does
    const mockUsers = usersData.map((user) => ({
      _id: user._id,
      _doc: user,
    }));
    usersModelStub.resolves(mockUsers);
    const result = await getUsers()(undefined, {}, undefined);
    expect(result).to.deep.equal(expectedUsersData);
    sinon.assert.called(usersModelStub);
  });
});
