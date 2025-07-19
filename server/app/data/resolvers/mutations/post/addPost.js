import { nanoid } from 'nanoid';
import { logger } from '../../../utils/logger';
import { logActivity } from '../../utils/activities_utils';
import GroupModel from '../../models/GroupModel';
import PostModel from '../../models/PostModel';
import MessageRoomModel from '../../models/MessageRoomModel';

export const addPost = (pubsub) => {
  return async (_, args) => {
    console.log('ARGS:   ', args);
    logger.info('Function: add post');
    let newPost = {};
    const hash = nanoid(6);
    const group = await GroupModel.findById(args.post.groupId);
    const title = args.post.title.replace(/ /g, '-').toLowerCase();
    const url = `/post${group.url}/${title}/${hash}`;

    const postObj = {
      ...args.post, url,
    };

    try {
      newPost = await new PostModel(postObj).save();
      const messageRoom = await MessageRoomModel.create({ users: newPost.userId, postId: newPost._id, messageType: 'POST' });

      const ids = {
        postId: newPost._id,
        userId: newPost.userId,
        messageRoomId: messageRoom._id,
      };
      newPost.messageRoomId = messageRoom._id;

      await logActivity('POSTED', ids, newPost.title);
    } catch (err) {
      throw new Error(err);
    }
    return newPost;
  };
};
