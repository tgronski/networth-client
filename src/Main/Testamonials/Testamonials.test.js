import React from "react";
import ReactDOM from "react-dom";
import Testamonials from "./Testamonials";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Testamonials
   />, div);
  ReactDOM.unmountComponentAtNode(div);
});
