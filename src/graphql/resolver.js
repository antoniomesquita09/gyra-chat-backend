import user from './user/resolver';

const query = {
  Query: {
    ...user.Query,
  },
};

const mutation = {
  Mutation: {
    ...user.Mutation,
  },
};

export default {
  ...user,
  ...query,
  ...mutation,
};
