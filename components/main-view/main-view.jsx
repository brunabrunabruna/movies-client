import React, { useEffect, useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import SimilarMovies from "../similar-movies/similar-movies";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import "./main-view.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProfileView from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

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
      })
      .catch((error) => {
        console.error("fetch error:", error);
      });
  }, [token]);

  // useEffect(() => {
  //   console.log(user.favoriteMovies);
  // }, [user.favoriteMovies]);

  //new client router syntax
  const getSearchedMovies = (arr, query) => {
    return arr.filter((movie) => {
      return movie.title.toLowerCase().includes(query.toLowerCase());
    });
  };
  console.log(getSearchedMovies(movies, search));

  useEffect(() => {
    setFilteredMovies(getSearchedMovies(movies, search));
  }, [search, movies]);

  return (
    <>
      <NavbarComponent
        user={user}
        movies={movies}
        search={search}
        setSearch={setSearch}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="margin-top-custom justify-content-center mb-5">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/movies" />
                  ) : (
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/signup"
              element={<>{user ? <Navigate to="/movies" /> : <SignupView />}</>}
            />
            <Route
              path="/movies"
              element={
                <>
                  {filteredMovies.map((movie) => {
                    return (
                      <MovieCard
                        movie={movie}
                        token={token}
                        setUser={setUser}
                        user={user}
                      />
                    );
                  })}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={<MovieView movies={movies} />}
            />
            <Route
              path="/profile"
              element={
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  setUser={setUser}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Row>
    </>
  );
};

export default MainView;
