import "../movie-view/movie-view.scss";
import Proptypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import Img from "../img/ghibli-logo.png";

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <Container className="">
        <Row className="mt-5">
          <Col className="mt-5 col-12"></Col>
          <Col className="mt-5 col-12"></Col>
          <Col className="mt-5 col-12"></Col>
        </Row>
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
              <Button
                className=" mt-auto m-4"
                variant="primary"
                onClick={onBackClick}
              >
                Go back
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

MovieView.propTypes = {
  movie: Proptypes.shape({
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    director: Proptypes.shape({ name: Proptypes.string }),
    genre: Proptypes.shape({ name: Proptypes.string }),
  }).isRequired,
  onBackClick: Proptypes.func.isRequired,
};

export default MovieView;
