export const typeDefs = `#graphql
  type Todo {
    id: Int
    todo: String
    completed: Boolean
    userId: Int
  }

  type User {
    id: Int
    firstName: String
    lastName: String
    todos: [Todo]
  }

  input AddTodoInput {
    todo: String!
    completed: Boolean!
    userId: Int!
  }

  input UpdateTodoInput {
    id: Int!
    todo: String
    completed: Boolean
  }

  type Query {
    users: [User]
    user(id: Int!): User
    todos: [Todo]
    todosByUser(userId: Int!): [Todo]
  }

  type Mutation {
    addTodo(input: AddTodoInput!): Todo
    updateTodo(input: UpdateTodoInput!): Todo
  }
`;
