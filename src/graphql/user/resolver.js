import User from '~models/user';

export default {
  User: {
    id: (user) => user.id,
    name: (user) => user.name,
    room: (user) => user.room,
  },

  Query: {
    users: async () => {
      const users = await User.find().populate('room');
      return users;
    },
  },

  Mutation: {
    user: async (_, input) => {
      const user = await User.create(input);
      return user;
    },
    updateUser: async (_, input) => {
      const { id } = input;
      const user = await User.findOneAndUpdate({ _id: id }, input, {
        new: true,
      }).populate('room');
      return user;
    },
  },
};
