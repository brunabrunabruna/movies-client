import Proptypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movie-card.scss";

const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(
    // true
    //hmmm dont get it?
    // user.favoriteMovies ? user.favoriteMovies.includes(movie._id) : false
    // user.favoriteMovies.includes(movie._id)
    false
  );
  //outputs to true false true false, why?
  // console.log(isFavorite);

  // Use useEffect to log the value of isFavorite when it changes
  // useEffect(() => {
  //   console.log("isFavorite changed:", isFavorite);
  // }, [isFavorite]);

  useEffect(() => {
    console.log(user);
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    console.log("called addfavmovies");
    fetch(
      `https://movies-api-render-0a0q.onrender.com/users/${user.username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("failed to add fav movie");
          // return false;
          // throw new Error("Failed to add/remove favorite movie.");
        }
      })
      //why is this called user?
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem("user", JSON.stringify(responseUser));
          setUser(responseUser);
          setIsFavorite(true);
          console.log("sucessfully added to favs");
          console.log(responseUser.favoriteMovies);
        }
      })
      .catch((err) => {
        console.log(`error on favmovies: ${err}`);
      });
  };

  const removeFavoriteMovie = () => {
    console.log("called removefavmovies");

    fetch(
      `https://movies-api-render-0a0q.onrender.com/users/${user.username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          console.log("response ok");
          console.log(response);

          return response.json();
        } else {
          console.log("failed to remove fav movie");
          return undefined;
        }
      })
      .then((user) => {
        //user is null for some reason
        console.log("user", user);
        console.log("isFavorite", isFavorite);

        if (user) {
          console.log("user = true");

          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          //sets isFav variable to false, so the correct button can render
          setIsFavorite(false);
          console.log("isFavorite set to false:", isFavorite);
          // console.log("sucessfully removed favs");
          // console.log(user.favoriteMovies);
        }
      })
      .catch((err) => {
        console.log(`error on favmovies: ${err}`);
      });
  };

  return (
    <Col
      key={movie._id}
      className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size "
    >
      <Card
        className="border-0 h-100 justify-content-center card-custom"
        // style={cardCustom}
      >
        <Card.Img src={movie.imagepath} className="img" />
        <Card.Body className="d-flex flex-column">
          {/* <Card.Title>{movie.title}</Card.Title> */}
          {/* <Card.Text>{movie.description}</Card.Text> */}

          {/* <Link className="mt-auto align-self-stretch"> */}
          {isFavorite ? (
            <Button
              className="w-100"
              variant="danger"
              onClick={removeFavoriteMovie}
            >
              remove fav
            </Button>
          ) : (
            <Button
              className="w-100"
              variant="primary"
              onClick={addFavoriteMovie}
            >
              add fav
            </Button>
          )}
          {/* </Link> */}

          {/* links to movie info page */}
          <Link
            className="mt-auto align-self-stretch"
            to={`/movies/${encodeURIComponent(movie._id)}`}
          >
            <Button className="w-100" variant="primary">
              More Infos
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

// MovieCard.propTypes = {
//   movie: Proptypes.shape({
//     title: Proptypes.string.isRequired,
//   }).isRequired,
// };

export default MovieCard;
