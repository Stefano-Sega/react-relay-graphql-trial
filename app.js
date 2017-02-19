'use strict';

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const serveStatic = require('serve-static');

var app = new express();

var secureHttpHeaders = function() {
    app.use(helmet());
};
var compressResponseBodies = function() {
    app.use(compression());
};

secureHttpHeaders();
compressResponseBodies();

require('./controllers')(app);

/*
app.use(serveStatic('dist', {
    'index': ['index.html'],
    'dotfiles': 'ignore',
}));
*/

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});