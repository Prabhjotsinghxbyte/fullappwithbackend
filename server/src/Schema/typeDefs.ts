export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Todo {
    id: Int
    todo: String
    completed: Boolean
    userId: Int
  }

  type Query {
    books: [Book]
    todos: [Todo]
    todo(id: Int!): Todo
  }`;
