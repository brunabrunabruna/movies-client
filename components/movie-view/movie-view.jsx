import "../movie-view/movie-view.scss";
import Proptypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import Img from "../img/ghibli-logo.png";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SimilarMovies from "../similar-movies/similar-movies";

const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // useEffect(() => {
  //   console.log(movieId);
  // }, [movieId]);

  if (!movies.length) {
    return <></>;
  }

  const movie = movies.find((m) => m._id === movieId);
  const similarMovies = movies.filter((otherMovie) => {
    return otherMovie.genre.name === movie.genre.name;
  });

  if (!movie) {
    return <div>unkonow movie!!!</div>;
  }

  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center ">
          <Col className=" col-lg-6 ">
            <Card className=" border-0 moviePoster mx-auto">
              <Card.Img src={movie.imagepath} className="rounded-4 " />
            </Card>
          </Col>
          <Col className="col-lg-6 mt-5 mt-md-0">
            <Card className="movie-infos border-0 h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-2">{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Title>Director:</Card.Title>

                <Card.Text>{movie.director.name}</Card.Text>
                <Card.Title>Genre:</Card.Title>

                <Card.Text>{movie.genre.name}</Card.Text>
              </Card.Body>
              <Link to="/movies">
                <Button className=" mt-auto m-4" variant="primary">
                  Go back
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
      <SimilarMovies movies={similarMovies} />
    </>
  );
};

MovieView.propTypes = {
  movie: Proptypes.shape({
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    director: Proptypes.shape({ name: Proptypes.string }),
    genre: Proptypes.shape({ name: Proptypes.string }),
  }),
};

export default MovieView;
