import UserModel from '../../models/UserModel';

export const searchUser = async (queryName, context) => {
  const users = await UserModel.find({
    name: {
      $regex: new RegExp(queryName, 'i'),
    },
    _id: { $ne: context.user._id },
  });

  return users;
};
