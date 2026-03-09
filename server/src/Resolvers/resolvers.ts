import { books } from "../Data/data.js";
import { Users } from "../Data/Users.js";
import { Todos } from "../Data/Todos.js";

export const resolvers = {
  Query: {
    books: () => books,
    Todos: () => Todos,
  },
};
