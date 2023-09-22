import { createRoot } from "react-dom/client";
//import statement to indcate you need to bundle index.scss
import MainView from "../components/main-view/main-view";
import { Col, Container, Row } from "react-bootstrap";
import "./index.scss";

//main component
const MyFlixApplication = () => {
  return (
    <Container className="">
      <MainView />
    </Container>
  );
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render your app in the root DOM element
root.render(<MyFlixApplication />);
