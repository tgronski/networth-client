import React from 'react';
import Menu from './Menu'
import './Nav.css'
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
        <header className="App-header">
        <div id="topLeftNav">
        <p><Link className='menuLink' to='/login'>Log in</Link> </p> 
        <p><Link className='menuLink' to='/register'>Register</Link></p>
        </div>
        <div id='topRightNav'>
        <Menu/>
        </div>
        <div id='mainTitle'><Link to='/'>Fisave</Link></div>
        </header>
    </div>
  );
}

export default Nav;
