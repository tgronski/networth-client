import React,{Component} from 'react';
import { Link } from "react-router-dom";
import IdleService from '../services/idle-service'
import TokenService from '../services/token-service'


export default class Logout extends Component{  
componentDidUpdate(){
    TokenService.hasAuthToken()
}

 handleLogoutClick=()=> {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }




  render(){


  return (<>
        {TokenService.hasAuthToken()
        ?        <p><Link className='menuLink'
        onClick={this.handleLogoutClick()}
        to='/'>
        Logout
        </Link></p>
        : null}
        </>

  )
}
}