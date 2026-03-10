export const typeDefs = `#graphql
  type Todo {
    id: Int!
    todo: String!
    completed: Boolean!
    userId: Int!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    todos: [Todo]
  }

  type Query {
    users: [User]
    user(id: Int!): User
    todos: [Todo]
    todosByUser(userId: Int!): [Todo]
  }

  input addTodoInput {
    todo: String!
    completed: Boolean!
    userId: Int!
  }

  input updateTodoInput {
    id: Int!
    todo: String
    completed: Boolean
  }

  type Mutation {
    addTodo(input: addTodoInput!): Todo
    updateTodo(input: updateTodoInput!): Todo
    deleteTodo(id: Int!): Boolean
  }
`;
