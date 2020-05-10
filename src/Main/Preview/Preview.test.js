import React from "react";
import ReactDOM from "react-dom";
import Preview from "./Preview";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Preview />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
