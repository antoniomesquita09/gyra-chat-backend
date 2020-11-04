import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: ID!
    content: String!
    author: User!
  }

  extend type Mutation {
    message(content: String!, author: ID!): Message
  }

  type Subscription {
    messageSent: Message
  }
`;
