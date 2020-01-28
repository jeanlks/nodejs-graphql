var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    quoteOfTheDay(phrase: String!): String,
    random: Float!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    quoteOfTheDay: ({phrase}) => {
        return Math.random() < 0.5 ? 'Take it easy' : phrase;
      },
      random: () => {
        return Math.random();
      },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');