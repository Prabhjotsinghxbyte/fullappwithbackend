export const typeDefs = `#graphql

type Todo {
  id: ID!
  todo: String
  completed: Boolean
  userId: ID
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  maidenName: String
  age: Int
  gender: String
  email: String
  phone: String
  username: String
  password: String
  birthDate: String
  image: String
  bloodGroup: String
  height: Float
  weight: Float
  eyeColor: String
  hair: Hair
  ip: String
  address: Address
  macAddress: String
  university: String
  bank: Bank
  company: Company
  ein: String
  ssn: String
  userAgent: String
  crypto: Crypto
  role: String
  todos: [Todo]
}

type Hair {
  color: String
  type: String
}

type Address {
  address: String
  city: String
  state: String
  stateCode: String
  postalCode: String
  coordinates: Coordinates
  country: String
}

type Coordinates {
  lat: Float
  lng: Float
}

type Bank {
  cardExpire: String
  cardNumber: String
  cardType: String
  currency: String
  iban: String
}

type Company {
  department: String
  name: String
  title: String
  address: Address
}

type Crypto {
  coin: String
  wallet: String
  network: String
}

type AuthPayload {
  accessToken: String
  refreshToken: String
}

input AddTodoInput {
  todo: String!
  completed: Boolean!
}

input UpdateTodoInput {
  id: ID!
  todo: String
  completed: Boolean
}

type Query {
  users: [User]
  user(id: ID!): User
  todos: [Todo]
  
  me: User
}
  
type Mutation {
  login(username: String!, password: String!): AuthPayload
  resetPassword(username: String!, email: String! , password: String!): String
  refreshToken(token: String!): AuthPayload
  addTodo(input: AddTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  deleteTodo(id: ID!): Boolean
}
`
