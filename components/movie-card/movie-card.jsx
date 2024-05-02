import Proptypes from "prop-types";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movie-card.scss";
const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

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
    // console.log("called addfavmovies");
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
          // console.log("sucessfully added to favs");
          // console.log(responseUser.favoriteMovies);
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
      className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size d-flex"
    >
      <Container>
        <Card
          className="border-0 h-100 justify-content-center card-custom"
          // style={cardCustom}
        >
          <Card.Img src={movie.imagepath} className="img" />
          <Card.Body className="d-flex flex-column">
            <Row>
              {/* links to movie info page */}
              <Col className="">
                <Link
                  className=""
                  to={`/movies/${encodeURIComponent(movie._id)}`}
                >
                  <Button
                    className="align-self-stretch w-100 h-100"
                    variant="primary"
                  >
                    More Infos
                  </Button>
                </Link>
              </Col>

              {/* heart(favorite) button */}
              <Col className="col-3">
                {isFavorite ? (
                  <Button
                    className="btn-fav-movie"
                    variant="link"
                    onClick={removeFavoriteMovie}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      class="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="btn-fav-movie"
                    variant="link"
                    onClick={addFavoriteMovie}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  );
};

// MovieCard.propTypes = {
//   movie: Proptypes.shape({
//     title: Proptypes.string.isRequired,
//   }).isRequired,
// };

export default MovieCard;
