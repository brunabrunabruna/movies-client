import { createRoot } from "react-dom/client";
//import statement to indcate you need to bundle index.scss
import "./index.scss";
import MainView from "../components/main-view/main-view";

//main component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>
        <b>It's Movie Night!</b>
      </div>
      <MainView />
    </div>
  );
};

//finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render your app in the root DOM element
root.render(<MyFlixApplication />);
