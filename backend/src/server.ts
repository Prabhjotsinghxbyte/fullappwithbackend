import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { TypeDefinitions } from "./schema/TypeDefinitions.js";
import { UserResolvers } from "./resolvers/UserResolvers.js";

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: TypeDefinitions,
    resolvers: UserResolvers,
  });

  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
}

startServer();
