import { PubSub } from 'apollo-server-express';

import Message from '~models/message';
import User from '~models/user';
import APIError from '~/errors/api-error';

const pubsub = new PubSub();

const MESSAGE_SENT = 'messageSent';

export default {
  Message: {
    id: (message) => message.id,
    content: (message) => message.content,
    author: (message) => message.author,
  },

  Mutation: {
    message: async (_, input) => {
      const message = await Message.create(input);
      const { author: authorId } = input;

      try {
        const author = await User.findById(authorId);
        message.author = author;

        pubsub.publish(MESSAGE_SENT, { messageSent: message });

        await message.save();
        return message.populate('author');
      } catch (e) {
        throw new APIError('User not found');
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_SENT),
    },
  },
};
