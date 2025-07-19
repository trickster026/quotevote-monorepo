import UserModel from '../../models/UserModel';

export const getUserInvites = () => {
  return async (_, args, context) => {
    const userInvites = await UserModel.find({
      _id: { $ne: null },
      email: { $ne: null },
      status: { $ne: null },
      joined: { $ne: null },
    });
    return userInvites;
  };
};
