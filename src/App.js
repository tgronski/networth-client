import React, {Component} from 'react';
import Nav from './Nav/Nav';
import Main from './Main/Main';
import './App.css';
import { Route } from "react-router-dom";
import About from "./About/About"
import Register from './Register/Register' 
import Login from './Login/Login'
import Networth from './Networth/Networth' 

export default class App extends Component {

  renderMainRoutes() {
    return(<span>
      <Route  exact path="/about" component={About}/>
      <Route  exact path="/" component={Main}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/networth' component={Networth}/>
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

