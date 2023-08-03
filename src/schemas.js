let { lambdas, schemas } = require("./type");
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// build the schemas
const typeDefs = mergeTypeDefs(schemas);
let schema = makeExecutableSchema({
    typeDefs
});

module.exports = {
    schema,
    rootValue: lambdas,
    graphiql: false,
}
