// var { graphql, buildSchema } = require("graphql");

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return "Hello world!";
//   },
// };

// // Run the GraphQL query and print out the response

// module.exports = function(query) {
//   return graphql(schema, query, root).then((response) => {
//     return response;
//   });
// };
const app = new (require("koa"))();
// const mount = require("koa-mount");
// const static = require("koa-static");
const graphqlHTTP = require("koa-graphql");

app.use(
  graphqlHTTP({
    schema: require("./schema"),
  })
);

app.listen(5000);
