import { gql } from "graphql-tag";

export const TypeDefinitions = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!): User
  }
`;
