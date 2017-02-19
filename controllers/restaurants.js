'use strict';

const graphqlHttp = require('express-graphql');

module.exports = graphqlHttp({
    schema: require("../models/restaurants"),
    graphiql: true
});