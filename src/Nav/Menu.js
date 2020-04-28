import React, {Component} from 'react';
import './Nav.css'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import TokenService from '../services/token-service'


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

    render(){
    let data = [{id: 1, name: "About", path: '/about'}, {id: 2, name: "Create an Account", path: '/register'}]
    if(TokenService.hasAuthToken() ===true){
       data= [{id: 1, name: "About", path: '/about'}, 
        {id: 3, name: "Networth", path: '/networth'}]
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
    </div>
  );
}
}
