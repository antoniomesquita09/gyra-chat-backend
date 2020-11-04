import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    room: Room
  }
  type Query {
    users: [User!]
  }
  type Mutation {
    user(name: String!): User
    updateUser(id: ID!, room: ID, name: String): User
  }
`;
