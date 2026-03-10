import fs from "fs";
import path from "path";

const todosPath = path.join(process.cwd(), "src/Data/todos.json");
const usersPath = path.join(process.cwd(), "src/Data/users.json");

const readTodos = () => {
  return JSON.parse(fs.readFileSync(todosPath, "utf-8"));
};

const writeTodos = (todos: any) => {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
};

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
};

export const resolvers = {
  Query: {
    users: () => {
      return readUsers();
    },

    user: (_: unknown, { id }: { id: number }) => {
      const users = readUsers();
      return users.find((u: any) => u.id === id);
    },

    todos: () => {
      return readTodos();
    },

    todosByUser: (_: unknown, { userId }: { userId: number }) => {
      const todos = readTodos();
      return todos.filter((t: any) => t.userId === userId);
    },
  },

  Mutation: {
    addTodo: (_: unknown, { input }: any) => {
      const todos = readTodos();

      const newTodo = {
        id: todos.length + 1,
        ...input,
      };

      todos.push(newTodo);

      writeTodos(todos);

      return newTodo;
    },

    updateTodo: (_: unknown, { input }: any) => {
      const todos = readTodos();

      const index = todos.findIndex((t: any) => t.id === input.id);

      if (index === -1) {
        throw new Error("todo not found");
      }

      const updatedTodo = {
        ...todos[index],
        ...input,
      };

      todos[index] = updatedTodo;

      writeTodos(todos);

      return updatedTodo;
    },
  },

  User: {
    todos: (parent: any) => {
      const todos = readTodos();
      return todos.filter((t: any) => t.userId === parent.id);
    },
  },
};
