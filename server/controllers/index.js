'use strict';

module.exports = function(app) {
    app.use('/api/graphql', require("./restaurants"));
};