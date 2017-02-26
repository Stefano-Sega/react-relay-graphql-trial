'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var Hello = require('./components/restaurant/restaurant.jsx');

ReactDOM.render(React.createElement(Hello, null), document.getElementById("content"));