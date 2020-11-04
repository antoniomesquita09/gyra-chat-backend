import user from './user/resolver';
import message from './message/resolver';
import room from './room/resolver';

const query = {
  Query: {
    ...user.Query,
    ...room.Query,
  },
};

const mutation = {
  Mutation: {
    ...user.Mutation,
    ...room.Mutation,
    ...message.Mutation,
  },
};

export default {
  ...user,
  ...query,
  ...mutation,
};
