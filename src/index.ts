import { buildSchema } from "type-graphql";
import { dataSource } from "./config/dataSource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import CountryResolver from "./resolvers/CountryResolver";

const startServer = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 3000 },
    context: async ({ req, res }) => {
      return { req, res };
    },
  });
  console.info("Server started on " + url);
};
startServer();
