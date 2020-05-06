import React from "react";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});