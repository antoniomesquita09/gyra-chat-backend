import Room from '~models/room';

export default {
  Room: {
    id: (room) => room.id,
    name: (room) => room.name,
    users: (room) => room.users,
    messages: (room) => room.messages,
  },

  Query: {
    rooms: async () => {
      const rooms = await Room.find().populate('users').populate('messages');
      return rooms;
    },
  },

  Mutation: {
    room: async (_, input) => {
      const room = await Room.create(input);
      return room;
    },
  },
};
