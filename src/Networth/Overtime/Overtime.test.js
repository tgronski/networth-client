import React from "react";
import ReactDOM from "react-dom";
import Overtime from "./Overtime";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Overtime />, div);
  ReactDOM.unmountComponentAtNode(div);
});
