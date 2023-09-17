import React from "react";

const SimilarMovies = ({ movies }) => {
  if (!movies.length) {
    return <></>;
  }

  return (
    <div>
      <div>similar movies</div>
      <div>
        {movies.map((movie) => {
          return <div>{movie.title}</div>;
        })}
      </div>
    </div>
  );
};

export default SimilarMovies;
