import React, {Component} from 'react';
import Nav from './Nav/Nav';
import Main from './Main/Main';
import './App.css';
import { Route } from "react-router-dom";
import About from "./About/About"
import Register from './Register/Register' 
import Login from './Login/Login'
import Networth from './Networth/Networth' 
import TokenService from './services/token-service'
import AuthApiService from './services/auth-api-service'
import IdleService from './services/idle-service'
import PrivateRoute from './Routes/PrivateRoute'
import PublicOnlyRoute from './Routes/PublicRoute'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    console.log('clearing')
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()

  }
  renderMainRoutes() {
    return(<span>
      <Route  exact path="/about" component={About}/>
      <PublicOnlyRoute  exact path="/main" component={Main}/>
      <PublicOnlyRoute  exact path="/" component={Main}/>
      <PublicOnlyRoute exact path='/register' component={Register}/>
      <PublicOnlyRoute exact path='/login' component={Login}/>
      <PrivateRoute exact path='/networth' component={Networth}/>
      <PrivateRoute exact path='/' component={Networth}/>
    </span>)
  }
  render() {
  return (
    <div className="App">
       <Nav/>
      <main>
       <span>{this.renderMainRoutes()}</span>

      </main>
    </div>
  )
  };
}

