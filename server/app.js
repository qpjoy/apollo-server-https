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
    key: fs.readFileSync(path.join(__dirname, 'cert.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
  }, app)
    .listen({ port: SSL_PORT || 4141}, () => {
      console.log(`HTTPS server running on ${
        true ?
          'https://localhost:' : 'https://cors.go4.so:'}${SSL_PORT || 4141}/`)
    }).setTimeout(780000)



// import express from 'express'
// import { ApolloServer } from 'apollo-server-express'
// // import typeDefs from './graphql/schema'
// // import resolvers from './graphql/resolvers'
// import fs from 'fs'
// import https from 'https'
// import http from 'http'

// const configurations = {
//   // Note: You may need sudo to run on port 443
//   production: { ssl: true, port: 443, hostname: 'localhost' },
//   development: { ssl: false, port: 4000, hostname: 'localhost' }
// }

// const environment = process.env.NODE_ENV || 'production'
// const config = configurations[environment]

// // Construct a schema, using GraphQL schema language
// const typeDefs = gql`
// type Query {
//   hello: String
// }
// `;

// // Provide resolver functions for your schema fields
// const resolvers = {
// Query: {
//   hello: () => 'Hello world!',
// },
// };

// const apollo = new ApolloServer({ typeDefs, resolvers })

// const app = express()
// apollo.applyMiddleware({ app })

// // Create the HTTPS or HTTP server, per configuration
// var server
// if (config.ssl) {
//   // Assumes certificates are in a .ssl folder off of the package root. Make sure 
//   // these files are secured.
//   server = https.createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, 'cert.key')),
//       cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
//     },
//     app
//   )
// } else {
//   server = http.createServer(app)
// }

// server.listen({ port: config.port }, () =>
//   console.log(
//     '🚀 Server ready at',
//     `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
//   )
// )