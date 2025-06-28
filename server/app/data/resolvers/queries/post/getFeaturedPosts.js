import PostModel from '../../models/PostModel';
import UserModel from '../../models/UserModel';

export const getFeaturedPosts = () => {
  return async () => {
    const posts = await PostModel.find({ featuredSlot: { $ne: null } })
      .sort({ featuredSlot: 1 });

    const postsWithCreator = await Promise.all(
      posts.map(async (post) => {
        const creator = await UserModel.findById(post.userId);
        const postObj = post.toObject();
        return {
          ...postObj,
          creator: creator
            ? {
                _id: creator._id,
                name: creator.name,
                username: creator.username,
                avatar: creator.avatar,
              }
            : null,
          votedBy: Array.isArray(postObj.votedBy)
            ? postObj.votedBy.map((v) => (v.userId ? v.userId.toString() : v))
            : [],
        };
      })
    );

    return postsWithCreator;
  };
};
