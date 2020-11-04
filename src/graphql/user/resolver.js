export default {
  User: {
    id: () => null,
    name: () => null,
  },

  Query: {
    me: () => {},
  },

  Mutation: {
    user: (name) => {
      return name;
    },
  },
};
