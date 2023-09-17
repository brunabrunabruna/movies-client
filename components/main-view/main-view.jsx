import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

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
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
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
