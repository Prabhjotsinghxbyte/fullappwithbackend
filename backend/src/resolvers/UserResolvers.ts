type User = {
  id: string;
  name: string;
};

let users: User[] = [];

export const UserResolvers = {
  Query: {
    users: (): User[] => users,
  },

  Mutation: {
    addUser: (_: any, { name }: { name: string }): User => {
      const newUser = {
        id: Date.now().toString(),
        name,
      };

      users.push(newUser);
      return newUser;
    },
  },
};
