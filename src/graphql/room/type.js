import { gql } from 'apollo-server';

export default gql`
  type Room {
    id: ID!
    name: String!
    users: [User!]
    messages: [Message!]
  }

  extend type Query {
    rooms: [Room!]
  }

  extend type Mutation {
    room(name: String!): Room
  }
`;
