import { createRoot } from "react-dom/client";
//import statement to indcate you need to bundle index.scss
import "./index.scss";

//main component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning!</div>
    </div>
  );
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render your app in the root DOM element
root.render(<MyFlixApplication />);
