exports.buildGetQuery = (url, params) => {
  let query = url;

  if (params)
    query += '?' + Object.keys(params)
      .map(i => encodeURIComponent(i) + '=' + encodeURIComponent(params[i]))
      .join('&');

  return query;
}