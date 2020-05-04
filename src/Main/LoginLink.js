import React,{Component} from 'react';
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'
import './LoginLink.css'

export default class LoginLink extends Component {

    
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

  render(){
  
  return (
    <div className="loginlink">
    {TokenService.hasAuthToken()
       ? null
       : this.renderLoginLink()}
    </div>
  );
}
}