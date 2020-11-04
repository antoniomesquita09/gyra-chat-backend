import User from '~models/user';

export default {
  User: {
    id: (user) => user.id,
    name: (user) => user.name,
  },

  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    user: async (_, input) => {
      const user = await User.create(input);
      return user;
    },
  },
};
