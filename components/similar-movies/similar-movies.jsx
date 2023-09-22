import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../similar-movies/similar-movies.scss";

const SimilarMovies = ({ movies, onMovieClick }) => {
  if (!movies.length) {
    return <></>;
  }

  return (
    <>
      {/* <Card className="card border-0 h-100 ">
    // <Card.Img src={movie.imagepath} className="img" />
    // <Card.Body className="d-flex flex-column">
    //   <Card.Title>{movie.title}</Card.Title>
    //   <Card.Text>{movie.description}</Card.Text>
    //   <Button */}

      <div className="fs-3">
        <Container className="mt-5">
          <Row>
            <Col className="mt-0 mb-3">
              <div>You might also like:</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="md-3 mb-5">
            {movies.map((movie) => {
              return (
                <>
                  <Col className="col-md-3 mb-5">
                    <Card className=" border-0 h-100 ">
                      <Card.Img
                        src={movie.imagepath}
                        className="rounded-4 similar-movie-img "
                      />

                      <Card.Body
                        className="d-flex flex-column"
                        onClick={() => {
                          onMovieClick(movie);
                        }}
                      >
                        <Button variant="secondary" className="secondary">
                          <Card.Title className="fs-6" href="/">
                            {movie.title}
                          </Card.Title>{" "}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SimilarMovies;
