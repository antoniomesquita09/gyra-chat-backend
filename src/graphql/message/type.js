import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: ID!
    content: String!
    author: User!
    room: Room!
  }

  extend type Query {
    messages(room: ID!): [Message!]
  }

  extend type Mutation {
    message(content: String!, author: ID!): Message
  }

  type Subscription {
    messageSent(room: ID!): Message
  }
`;
