import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";

const ProfileView = ({ user, token, movies, setUser }) => {
  //   const userBday = user.birthday.toDateString();
  //   console.log(token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //creates an array with all the movies
  let result = movies.filter((m) => user.favoriteMovies.includes(m._id));
  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    //DEBUG
    console.log(JSON.stringify(data));
    console.log(username);

    fetch(
      `https://movies-api-render-0a0q.onrender.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          // Read the response body as text
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };
  //   console.log(favoriteMovies);
  //   useEffect(() => {
  //     // if (!token) {
  //     //   return;
  //     // }
  //     fetch(`https://movies-api-render-0a0q.onrender.com/users/`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //DEBUG
  //         console.log("users", data);
  //         // setMovies(data);
  //       })
  //       .catch((error) => {
  //         console.error("fetch error:", error);
  //       });
  //   }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <CardGroup>
              <Card className="mb-5 border border-0">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Card.Text>Want to change some infos?</Card.Text>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>
                        username:
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          // required
                          placeholder={user.username}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          // required
                          placeholder="*******"
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>
                        email:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          // required
                          placeholder={user.email}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        bday:
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            setBirthday(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                      className="text-white"
                    >
                      update profile
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="">
          {result.map((movie) => {
            return (
              <Col key={movie._id} className="mb-4">
                <MovieCard
                  movie={movie}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            );
          })}
          <Col>hello </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileView;
