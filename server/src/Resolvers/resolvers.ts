import { Users } from "../Data/Users.js";
import { Todos } from "../Data/Todos.js";

type TodosByUserArgs = {
  userId: number;
};

type AddTodoArgs = {
  input: {
    todo: string;
    completed: boolean;
    userId: number;
  };
};

type UpdateTodoArgs = {
  input: {
    id: number;
    todo?: string;
    completed?: boolean;
  };
};

export const resolvers = {
  Query: {
    users: () => Users,
    user: (_: unknown, { id }: { id: number }) => Users.find((user) => user.id === id),

    todos: () => Todos,

    todosByUser: (_: unknown, { userId }: TodosByUserArgs) => {
      return Todos.filter((todo) => todo.userId === userId);
    },
  },

  Mutation: {
    addTodo: (_: unknown, { input }: AddTodoArgs) => {
      const newTodo = {
        id: Todos.length + 1,
        ...input,
      };

      Todos.push(newTodo);
      return newTodo;
    },

    updateTodo: (_: unknown, { input }: UpdateTodoArgs) => {
      const todo = Todos.find((t) => t.id === input.id);

      if (!todo) {
        throw new Error("Todo not found");
      }

      if (input.todo !== undefined) {
        todo.todo = input.todo;
      }

      if (input.completed !== undefined) {
        todo.completed = input.completed;
      }

      return todo;
    },
  },

  User: {
    todos: (parent: { id: number }) => {
      return Todos.filter((todo) => todo.userId === parent.id);
    },
  },
};
