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

  //UPDATING PROFILE INFOS
  const handleUpdate = (event) => {
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

  //DELETE ACCOUNT
  const deleteAccount = () => {
    fetch(
      `https://movies-api-render-0a0q.onrender.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        // setMovies(null);
        localStorage.clear();
        alert("your account has been deleted");
        window.location.replace("/login");
      } else {
        alert("could not delete account");
      }
    });
  };

  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col md={5}>
            <CardGroup>
              <Card className="mb-5 border border-0 card-custom">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Card.Text>Want to change some infos?</Card.Text>
                  <Form onSubmit={handleUpdate}>
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
                      onClick={handleUpdate}
                      className="text-white"
                    >
                      update profile
                    </Button>
                    <Link to="/login">
                      <Button
                        variant="danger"
                        type=""
                        onClick={deleteAccount}
                        className="text-white"
                      >
                        delete your account
                      </Button>
                    </Link>
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
        </Row>
      </Container>
    </>
  );
};

export default ProfileView;
