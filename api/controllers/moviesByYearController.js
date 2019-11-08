'use strict';

const model = require('../models/moviesByYearModel');

exports.getMoviesByYear = (req, res) => {
  const title = req.query.Title;
  let page = 1;
  let totalPages = 1;
  let total = 0;
  const moviesByYear = [];

  const getMovies = () => {
    if (page <= totalPages) {
      model.getMoviesByTitle(title, page, movies => {
        totalPages = movies.total_pages;
        total += movies.data.length;
        movies.data.forEach(movie => {
          const i = moviesByYear.findIndex(m => m.year === movie.Year);
          if (i === -1)
            moviesByYear.push({ year: movie.Year, movies: 1 }); //not found, so initialize
          else
            moviesByYear[i].movies++;
        });

        page++;
        getMovies(); //recursive callback due to the async nature of the request
      });
    }
    else {
      res.json({ moviesByYear, total }); //forwards the complete response
    }
  }

  getMovies();
};