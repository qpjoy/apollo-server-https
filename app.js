const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const SSL_PORT = 8443;
 
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

https.createServer({
    key: fs.readFileSync(path.join(process.cwd(), '/key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), '/cert.pem'))
  })
    .listen(SSL_PORT || 4141, () => {
      console.log(`HTTPS server running on ${
        true ?
          'https://cors.go4.so:' : 'https://cors.go4.so:'}${SSL_PORT || 4141}/`)
    }).setTimeout(780000)