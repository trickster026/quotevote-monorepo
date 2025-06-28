import { logger } from '../../../utils/logger';
import CommentsModel from '../../models/CommentModel';

export const editComment = pubsub => {
  return async (_, args) => {
    logger.info('Function: editComment');

    try {
      const comment = await CommentsModel.findByIdAndUpdate(
        args.comment_id,
        args.comment,
        { new: true, upsert: true }
      );
      return comment;
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const deleteComment = pubsub => {
  return async (_, args) => {
    logger.info('Function: deleteComment');

    try {
      await CommentsModel.findByIdAndRemove(args.comment_id);
      return { deleted: true };
    } catch (err) {
      throw new Error(err);
    }
  };
};
