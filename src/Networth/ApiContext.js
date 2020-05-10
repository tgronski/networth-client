import React from "react";

export default React.createContext({
  entries: [{}],
  handleDeleteEntry: () => {},
  goals: [{}],
  handleDeleteGoal: () => {},
  advice: [{}],
  delete_loader: Boolean,
});
