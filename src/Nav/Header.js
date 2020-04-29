import React,{Component} from 'react';
import Menu from './Menu'
import './Nav.css'
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

export default class Header extends Component {
    handleLogoutClick=()=> {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
      }
    
  renderLogoutLink() {
    console.log(TokenService.hasAuthToken())
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
    console.log(TokenService.hasAuthToken())
    return (
      <>
        <p><Link className='menuLink' to='/login'>Log in</Link> </p> 
        <p><Link className='menuLink' to='/register'>Register</Link></p>
</>
    )
  }


  render(){
  
  return (
    <div className="header">
    {TokenService.hasAuthToken()
       ? this.renderLogoutLink()
       : this.renderLoginLink()}
    </div>
  );
}
}
