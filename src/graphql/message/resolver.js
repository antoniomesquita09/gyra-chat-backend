import Message from '~models/message';
import User from '~models/user';

export default {
  Message: {
    id: (user) => user.id,
    name: (user) => user.name,
  },

  Mutation: {
    message: async (_, input) => {
      const message = await Message.create(input);
      const { author: authorId } = input;

      const author = await User.findById(authorId);

      if (!author) throw new Error('User not found');

      message.author = author;
      await message.save();
      return message.populate('author');
    },
  },
};
