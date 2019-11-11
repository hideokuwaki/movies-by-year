'use strict';

const model = require('../models/moviesByYearModel');

exports.getMoviesByYear = async (req, res) => {
  const title = req.query.Title;
  let page = 1;
  let totalPages = 1;
  let total = 0;
  let request_counter = 0;
  const moviesByYear = [];

  const getMovies = async () => {
    await model.getMoviesByTitle(title, page, movies => {
      request_counter++;
      totalPages = movies.total_pages;
      total += movies.data.length;
      movies.data.forEach(movie => {
        const i = moviesByYear.findIndex(m => m.year === movie.Year);
        if (i === -1)
          moviesByYear.push({ year: movie.Year, movies: 1 }); //not found, so initialize
        else
          moviesByYear[i].movies++;
      });
      if (request_counter >= totalPages) {
        moviesByYear.sort((a, b) => a.year - b.year); //sort ascending by year
        res.json({ moviesByYear, total }); //forwards the completed response
      }
    });
  }

  await getMovies(); //query/await once first to get the total pages

  while (page < totalPages) { //dispatch all the queries async
    page++;
    getMovies();
  }
};