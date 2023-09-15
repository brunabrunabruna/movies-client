import React, { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
// import { response } from "express";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      title: "Spirited Away",
      description:
        "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts.",
      genre: {
        name: "Adventure",
        Description:
          "Setting plays an important role in an adventure film, sometimes itself acting as a character in the narrative. They are typically set in far away lands, such as lost continents or other exotic locations. They may also be set in a period background and may include adapted stories of historical or fictional adventure heroes within the historical context. Such struggles and situations that confront the main characters include things like battles, piracy, rebellion, and the creation of empires and kingdoms.",
      },
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki is 1 of Japan's greatest animation directors. The entertaining plots, compelling characters & breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan.",
        birth: "05-01-1941",
        death: "",
      },
      imagepath:
        "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      featured: true,
    },
    {
      title: "The Wind Rises",
      description:
        "A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during World War II.",
      genre: {
        name: "Biography",
        Description:
          "A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used.[2] They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives.",
      },
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki is 1 of Japan's greatest animation directors. The entertaining plots, compelling characters & breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan.",
        birth: "05-01-1941",
        death: "",
      },
      imagepath:
        "https://m.media-amazon.com/images/M/MV5BMTU4NDg0MzkzNV5BMl5BanBnXkFtZTgwODA3Mzc1MDE@._V1_.jpg",
      featured: false,
    },
    {
      title: "My Neighbour Totoro",
      description:
        "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
      genre: {
        name: "Fantasy",
        Description:
          "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and usually inspired by mythology or folklore. The term 'fantasy' can also be used to describe a 'work of this genre'usually literary.",
      },
      director: {
        name: "Hayao Miyazaki",
        bio: "Hayao Miyazaki is 1 of Japan's greatest animation directors. The entertaining plots, compelling characters & breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan.",
        birth: "05-01-1941",
        death: "",
      },
      imagepath:
        "https://m.media-amazon.com/images/M/MV5BYTI3YjJiN2UtMDliNy00ZWRmLWI3ZTAtMTZlNWViYjJlNzUwXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_.jpg",
      featured: true,
    },
  ]);

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
