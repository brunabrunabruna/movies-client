import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { response } from "express";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://movies-api-render-0a0q.onrender.com/movies")
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        console
          .log("data from api:", data)
          .catch((err) => console.log("err:", err))
      );
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
