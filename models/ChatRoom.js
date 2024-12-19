import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.models.ChatRoom || mongoose.model('ChatRoom', ChatRoomSchema);
