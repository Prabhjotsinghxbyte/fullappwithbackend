import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./schema/TypeDefinitions.js";
import { resolvers } from "./resolvers/UserResolvers";

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
}

startServer();
