import Proptypes from "prop-types";
import "./movie-card.scss";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="card"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: Proptypes.shape({
    title: Proptypes.string.isRequired,
  }).isRequired,
  onMovieClick: Proptypes.func.isRequired,
};

export default MovieCard;
