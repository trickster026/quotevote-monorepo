import UserModel from '../../models/UserModel';

export const findUserByEmail = () => {
  return async (_, args, context) => {
    try {
      const { email } = args;
      const duplicateUsers = await UserModel.find({ email });
      return duplicateUsers;
    } catch (err) {
      throw new Error(err);
    }
  };
};
