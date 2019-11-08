'use strict';

module.exports = function(app) {
  var moviesByYear = require('../controllers/moviesByYearController');

  app.route('/api/movies/count')
    .get(moviesByYear.getMoviesByYear)
};