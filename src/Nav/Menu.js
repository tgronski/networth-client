import React, {Component} from 'react';
import './Nav.css'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'


export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            showDropDown: false
        }
    }

    handleDropDown=()=>{
        if(this.state.showDropDown===false){
            this.setState({showDropDown: true})
            }
            else this.setState({showDropDown: false})
      
    }
    handleUnDrop=()=>{
        this.setState({showDropDown: false})
    
    }
    handleLogoutClick=()=> {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
      }
    
      renderLogoutLink() {
        return (
          <div className='Header__logged-in'> <p><Link className='menuLink'
            onClick={this.handleLogoutClick()}
           >
            Logout
            </Link></p>      </div>
        )
      }
    render(){
    let data = [{id: 1, name: "About", path: '/about'}, {id: 2, name: "Create an Account", path: '/register'},{id:3, name:'Log In', path: '/login'}]
    let logout=null
    if(TokenService.hasAuthToken() ===true){
       data= [{id: 1, name: "About", path: '/about'}, 
        {id: 3, name: "Networth", path: '/networth'} ]
        logout= this.renderLogoutLink()
    }

  
  return ( <div className="Menu" onMouseEnter={this.handleDropDown}  onMouseLeave={this.handleUnDrop}>
    <FontAwesomeIcon className='burgerIcon' onClick={this.handleDropDown}  icon={faBars}/>
    {this.state.showDropDown
        ?( <ul  id='nav-leader'>
                {data.map(data=>(
                <li key={data.id} onClick={this.handleUnDrop} ><Link className='menuLink' to={data.path}><h3>{data.name}</h3></Link></li>)
            )}
            </ul>
        )
        :(null
        )
    }
    {logout}
    </div>
  );
}
}
