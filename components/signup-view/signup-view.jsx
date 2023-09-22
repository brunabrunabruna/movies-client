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
import CardHeader from "react-bootstrap/esm/CardHeader";

const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    //DEBUG
    console.log(JSON.stringify(data));
    console.log(username);

    fetch("https://movies-api-render-0a0q.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("signup successful");
          window.location.reload();
        } else {
          const errorText = await response.text();
          // Read the response body as text
          console.log("Error response body:", errorText);
          alert("signup failed");
        }
      })

      .catch((err) => console.log("error", err));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <CardGroup>
            <Card className="mb-5 border border-0">
              <Card.Body>
                <Card.Title>Please register:</Card.Title>

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

                  <Form.Group>
                    <Form.Label>
                      email:
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                        placeholder="enter your email"
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
                        required
                        // placeholder="enter your birthday"
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
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupView;
