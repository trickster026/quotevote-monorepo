import mongoose from 'mongoose';

const schema = mongoose.Schema({
  messageRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  readBy: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  }
});

export default mongoose.model('Messages', schema);
