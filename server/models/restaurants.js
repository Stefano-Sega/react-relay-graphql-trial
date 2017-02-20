var GraphQL = require("graphql");
const fetch = require('node-fetch');
const querystring = require('querystring');
const globalConfig = require('../config/global');

const GraphQLSchema = GraphQL.GraphQLSchema;
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInt = GraphQL.GraphQLInt;
const GraphQLString = GraphQL.GraphQLString;
const GraphQLBoolean = GraphQL.GraphQLBoolean;
const GraphQLFloat = GraphQL.GraphQLFloat;
const GraphQLList = GraphQL.GraphQLList;

var fetchRestaurants = function(args) {
    var params = querystring.stringify({
        query: "restaurants+in+Dubai+" + (!args.filterText ? "" : args.filterText),
        key: globalConfig.googleapis.key
    });

    return fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?" + params)
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                return json.results;
            });
};

const GraphQLLocation = new GraphQLObjectType({
    name: "Location",
    fields: {
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    }
});

const GraphQLOpeningHours = new GraphQLObjectType({
    name: "OpeningHours",
    fields: {
        exceptional_date: { type: new GraphQLList(GraphQLString) },
        open_now: { type: GraphQLBoolean },
        weekday_text: { type: new GraphQLList(GraphQLString) }
    }
});

const GraphQLPhoto = new GraphQLObjectType({
    name: "Photo",
    fields: {
        height: { type: GraphQLInt },
        width: { type: GraphQLInt },
        html_attributions: { type: GraphQLString },
        photo_reference: { type: GraphQLString }
    }
});

const GraphQLPlace = new GraphQLObjectType({
  name: "Place",
  fields: {
    formatted_address: { type: GraphQLString },
    location: { 
        type: GraphQLLocation,
        resolve: function (root, args) {
            return  root.geometry.location;
        }
    },
    icon: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    opening_hours: { type: GraphQLOpeningHours },
    photos: { type: new GraphQLList(GraphQLPhoto) },
    place_id: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    reference: { type: GraphQLString },
    types: { type: new GraphQLList(GraphQLString) }
  }
});

const _query = new GraphQLObjectType({
  name: "Query",
  fields: {
    results: { 
        type: new GraphQLList(GraphQLPlace), 
        args: {
            filterText: { type: GraphQLString }
        },
        resolve: (root, args) => fetchRestaurants(args)
    }
  },
});

var _schema = new GraphQLSchema({
    query: _query
    // , mutation: ...
});

module.exports = _schema;