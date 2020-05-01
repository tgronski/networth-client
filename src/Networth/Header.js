import React,{Component} from 'react';
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

export default class Header extends Component {

    
      handleLogoutClick(){
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
      }
    
      renderLogoutLink() {
        return (
          <div className='Header__logged-in'> <p><Link className='menuLink'
          onClick={this.handleLogoutClick}
          to='/'>       
            Logout
            </Link></p>      </div>
        )
      }

  render(){
  
  return (
    <div className="header">
    {TokenService.hasAuthToken()
       ? this.renderLogoutLink()
       : null}
    </div>
  );
}
}
