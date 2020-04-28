import React,{Component} from 'react';
import './Nav.css'
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import Menu from './Menu'



export default class Nav extends Component {

  handleLogoutClick=()=> {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <p><Link className='menuLink'
          onClick={this.handleLogoutClick()}
          to='/'>
          Logout
        </Link></p>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <>
        <p><Link className='menuLink' to='/login'>Log in</Link> </p> 
        <p><Link className='menuLink' to='/register'>Register</Link></p>
</>
    )
  }


  render(){
  return (
    <div className="Nav">
     <div id="topLeftNav">
       {TokenService.hasAuthToken()
       ? this.renderLogoutLink()
       : this.renderLoginLink()}
        </div>
        <div id='topRightNav'>
        <Menu/>
        </div>
        <div id='mainTitle'><Link to='/'>Fisave</Link></div>
    </div>
  );
}
}

