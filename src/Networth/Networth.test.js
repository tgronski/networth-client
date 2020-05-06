import React from "react";
import ReactDOM from "react-dom";
import Networth from "./Networth";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
      <Networth/>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});