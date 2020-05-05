import React,{Component} from 'react';
import { Link,Switch } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

export default class Header extends Component {
constructor(props){
  super(props)
  this.state={
    isloggedin: false
  }
}
      renderLoginLink() {
        return (
          <div className='Header__logged-in'> <p><Link className='menuLink'
          to='/login'>       
            Login {' '}
            </Link>|<Link className='menuLink'
          to='/register'>       
          {' '} Create an Account
            </Link></p>      
            </div>
        )
      }
      handleLogoutClick(){
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
      }
    
      renderLogoutLink() {
        return (
          <div className='Header__logged-in'><Link className='menuLink'
          onClick={this.handleLogoutClick}
          to='/'>       
            Logout
            </Link>    </div>
        )
      }

  render(){
  if(TokenService.hasAuthToken()===true){
    return this.renderLogoutLink()
  }
  return (
    <div className="header">
      {this.renderLoginLink()}
    </div>
  );
}
}
