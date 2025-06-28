import MessageModel from '~/resolvers/models/MessageModel';

export const getMessages = async (messageRoomId, context) => {
  const messages = await MessageModel.find({
    messageRoomId,
  });
  return messages;
};
