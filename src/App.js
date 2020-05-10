import React, { Component } from "react";
import Nav from "./Nav/Nav";
import Main from "./Main/Main";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import About from "./About/About";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Networth from "./Networth/Networth";
import TokenService from "./services/token-service";
import AuthApiService from "./services/auth-api-service";
import IdleService from "./services/idle-service";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicOnlyRoute from "./Routes/PublicRoute";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();

      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();

    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();

    this.forceUpdate();
  };
  renderMainRoutes() {
    return (
      <Switch>
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/networth" component={Networth} />
        <PrivateRoute exact path="/" component={Networth} />
        <PublicOnlyRoute exact path="/main" component={Main} />
        <PublicOnlyRoute exact path="/" component={Main} />
        <PublicOnlyRoute exact path="/register" component={Register} />
        <PublicOnlyRoute exact path="/login" component={Login} />
        <PublicOnlyRoute component={Main} />
      </Switch>
    );
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <main>
          <span>{this.renderMainRoutes()}</span>
        </main>
      </div>
    );
  }
}
