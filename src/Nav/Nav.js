import React,{Component} from 'react';
import './Nav.css'
import { Link } from "react-router-dom";
import Menu from './Menu'
import Header from './Header'
import TokenService from '../services/token-service';


export default class Nav extends Component{
  

render(){
  return (
    <div className="Nav">
     <div id="topLeftNav">
     {/* <Header /> */}
        </div>
        
        <div id='topRightNav'>
        <Menu/>
        </div>
        <div id='mainTitle'><Link to='/'>Fisave</Link></div>
    </div>
  );

}
}
