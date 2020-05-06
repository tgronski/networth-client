import React from "react";
import ReactDOM from "react-dom";
import NetworthPie from "./NetworthPie";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
      <NetworthPie/>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});