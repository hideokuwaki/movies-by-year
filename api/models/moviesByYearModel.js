'use strict'

const request = require('request');
const rest = require('../utils/restUtils');

const url = 'https://jsonmock.hackerrank.com/api/movies/search/';

exports.getMoviesByTitle = (title, page, response) => {
  const params = {
    Title: title,
    page: page,
  }

  const query = rest.buildGetQuery(url, params);

  request(query, { json: true }, (err, res, body) => {
    if (err)
      return console.log(err);
    else
      response(body);
  });
}