import React,{Component} from 'react';
import Menu from './Menu'
import './Nav.css'
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'


export default class Header extends Component {

  renderLogoutLink=(e)=> {
    return (
      <div className='Header__logged-in'>
        <p><Link className='menuLink'
          onClick={this.props.handleLogoutClick()}
          to='/'>
          Logout
        </Link></p>
      </div>
    )
  }

  renderLoginLink(e) {
    return (
      <>
        <p><Link className='menuLink' to='/login'>Log in</Link> </p> 
        <p><Link className='menuLink' to='/register'>Register</Link></p>
</>
    )
  }


  render(){
  console.log(TokenService.hasAuthToken())
  return (
    <div className="header">
       
    </div>
  );
}
}
