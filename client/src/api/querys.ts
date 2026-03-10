import { gql } from "@apollo/client";

export const getTodosByUserid = gql`
  query GetTodosByUser($userId: Int!) {
    todosByUser(userId: $userId) {
      id
      todo
      completed
    }
  }
`;
export const addTodoMutation = gql`
  mutation addTodo($input: AddTodoInput!) {
    addTodo(input: $input) {
      id
      todo
      completed
      userId
    }
  }
`;
