import React from "react";
import ReactDOM from "react-dom";
import GoalsForm from "./GoalsForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
      <GoalsForm />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});