import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
