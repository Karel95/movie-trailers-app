import React from "react";

const MovieList = ({ movies, selectMovie }) => {
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  return (
    <div className="container mt-3">
      <div className="row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-sm-6 col-md-4 col-xl-3 mb-3"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={`${URL_IMAGE + movie.poster_path}`}
              alt=""
              height={600}
              width="100%"
            />
            <h4 className="text-center">{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
