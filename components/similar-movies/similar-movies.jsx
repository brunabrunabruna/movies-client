import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../similar-movies/similar-movies.scss";
import { Link } from "react-router-dom";

const SimilarMovies = ({ movies }) => {
  if (!movies.length) {
    return <></>;
  }
  // debug
  // console.log(JSON.stringify(movies));
  return (
    <>
      <div className="fs-3">
        <Container className="mt-5">
          <Row>
            <Col className="mt-0 mb-3">
              <div>You might also like:</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mb-5">
            {movies.map((movie) => {
              return (
                <>
                  <Col className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-5">
                    <Card className=" border-0 h-100 ">
                      <Card.Img
                        src={movie.imagepath}
                        className="rounded-4 similar-movie-img "
                      />

                      <Card.Body className="d-flex flex-column">
                        <Link to={`/movies/${movie._id}`}>
                          <Button variant="secondary" className="secondary">
                            <Card.Title className="fs-6" href="/">
                              {movie.title}
                            </Card.Title>
                          </Button>
                        </Link>
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
