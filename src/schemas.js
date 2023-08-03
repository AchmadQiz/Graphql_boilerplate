let { lambdas, schemas } = require("./lambda");
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = mergeTypeDefs(schemas);
let schema = makeExecutableSchema({
    typeDefs
});

module.exports = {
    schema,
    rootValue: lambdas,
    graphiql: false,
}
