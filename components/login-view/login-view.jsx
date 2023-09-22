import React, { useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    //DEBUG
    // console.log("login data stringified", JSON.stringify(data));

    fetch("https://movies-api-render-0a0q.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // console.log("response json", response.json());
        return response.json();
      })
      .then(async (data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          console.log("data.user:", data.user);
          alert("no such user");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <CardGroup className="">
            <Card className="mb-5 border border-0">
              <Card.Body>
                <Card.Title>Already have an account? Login:</Card.Title>
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
                        required
                        placeholder="enter your username"
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
                        required
                        placeholder="enter your password"
                      />
                    </Form.Label>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white"
                  >
                    submit
                  </Button>
                </Form>{" "}
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
