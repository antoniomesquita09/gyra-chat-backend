import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', schema);
