import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import SimilarMovies from "../similar-movies/similar-movies";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-api-render-0a0q.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        //DEBUG
        // console.log("data", data);
        setMovies(data);
        // console.log("data", data);
      })
      .catch((error) => {
        console.error("fetch error:", error);
      });
  }, [token]);

  //if user is not logged in, return login form
  if (!user) {
    return (
      <div>
        <NavbarComponent />
        {/* empty space at the top of the page ( so navbar doesnt block content) */}
        <Row className="mt-5">
          <Col className="mt-5 col-12"></Col>
          <Col className="mt-5 col-12"></Col>
          <Col className="mt-5 col-12"></Col>
        </Row>
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-center fs-2 m-5">
              Studio Ghibli Movies Archive
            </Col>
          </Row>
        </Container>
        <SignupView />
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </div>
    );
  }
  if (selectedMovie) {
    const similarMovies = movies.filter((otherMovie) => {
      return (
        otherMovie.genre.name === selectedMovie.genre.name &&
        otherMovie._id !== selectedMovie._id
      );
    });

    return (
      <>
        <NavbarComponent />
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <SimilarMovies
          movies={similarMovies}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      </>
    );
  }

  return (
    <>
      <NavbarComponent />
      {/* empty space at the top of the page ( so navbar doesnt block content) */}
      <Row className="mt-5">
        <Col className="mt-5 col-12"></Col>
        <Col className="mt-5 col-12"></Col>
        <Col className="mt-5 col-12"></Col>
      </Row>
      <Row md={3} className="mb-5">
        {movies.map((movie) => {
          return (
            <Col key={movie._id} className="mb-5">
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          );
        })}
      </Row>
      <Button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        className="m-3 text-align-center"
      >
        logout
      </Button>
    </>
  );
};

export default MainView;
