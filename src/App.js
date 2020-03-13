import React from "react";
import "./App.css";
import { render } from "@testing-library/react";
import Callback from "../src/components/Auth/Auth/Callback";
import Signup from "../src/components/Auth/Auth/Signup";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/signup" component={Signup} />
      <Route exact path="/callback" component={Callback} exact />
    </div>
  );
}

export default App;
