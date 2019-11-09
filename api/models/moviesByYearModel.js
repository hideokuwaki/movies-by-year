'use strict'

const request = require('request-promise');
const rest = require('../utils/restUtils');

const url = 'https://jsonmock.hackerrank.com/api/movies/search/';

exports.getMoviesByTitle = async (title, page, callback) => {
  const params = {
    Title: title,
    page: page,
  }

  const query = rest.buildGetQuery(url, params);

  await request(query, { json: true }, (err, res, body) => {
    if (err)
      return console.log(err);
    else
      callback(body);
  });
}