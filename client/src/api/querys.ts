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
  mutation addTodo($input: addTodoInput!) {
    addTodo(input: $input) {
      id
      todo
      completed
      userId
    }
  }
`;
export const updateTodoMutation = gql`
  mutation updateTodo($input: updateTodoInput!) {
    updateTodo(input: $input) {
      id
      todo
      completed
      userId
    }
  }
`;

export const deleteTodoMutation = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;
