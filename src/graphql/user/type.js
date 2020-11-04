import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    user(name: String!): User
  }
`;
