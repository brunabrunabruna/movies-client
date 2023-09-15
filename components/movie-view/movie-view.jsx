import "../movie-view/movie-view.scss";
import Proptypes from "prop-types";
const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img src={movie.imagepath} className="moviePoster" />
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.name}</span>
      </div>
      <button onClick={onBackClick}>go back</button>
    </div>
  );
};

// MovieView.propTypes = {
//   movie: Proptypes.shape({
//     title: Proptypes.string.isRequired,
//     description: Proptypes.string.isRequired,
//     // director: PropTypes.shape({ name: Proptypes.string }),
//     // genre: PropTypes.shape({ name: Proptypes.string }),
//   }).isRequired,
//   onBackClick: Proptypes.func.isRequired,
// };

export default MovieView;
