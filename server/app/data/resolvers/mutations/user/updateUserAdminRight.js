import UserModel from '../../models/UserModel';


export const updateUserAdminRight = (pubsub) => {
  return async (_, args) => {
    try {
      const user_id = args.user_id;
      const admin = args.admin;
      await UserModel.update({ _id: user_id }, { $set: { admin, primary: true } }, { upsert: true, new: true });
      const user = await UserModel.findOne({ _id: user_id });
      return user;
    } catch (err) {
      throw `Update failed: ${err}`;
    }
  };
};
