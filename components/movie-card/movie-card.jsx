import Proptypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="card border-0 h-100 ">
      <Card.Img src={movie.imagepath} className="img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button
          // className="mt-auto"
          className=" mt-auto"
          variant="primary"
          onClick={() => {
            onMovieClick(movie);
          }}
        >
          More Infos
        </Button>
      </Card.Body>
    </Card>

    // <div
    //   className="card"
    //   onClick={() => {
    //     onMovieClick(movie);
    //   }}
    // >
    //   {movie.title}
    // </div>
  );
};

MovieCard.propTypes = {
  movie: Proptypes.shape({
    title: Proptypes.string.isRequired,
  }).isRequired,
  onMovieClick: Proptypes.func.isRequired,
};

export default MovieCard;
