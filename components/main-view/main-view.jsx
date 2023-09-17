import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import SimilarMovies from "../similar-movies/similar-movies";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://movies-api-render-0a0q.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);
  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    const similarMovies = movies.filter((otherMovie) => {
      return (
        otherMovie.genre.name === selectedMovie.genre.name &&
        otherMovie._id !== selectedMovie._id
      );
    });

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <SimilarMovies movies={similarMovies} />
      </>
    );
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
