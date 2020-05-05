import React, {Component} from 'react';
import "./Guide.css"
import { HashLink as Link } from 'react-router-hash-link';

export default class Guide extends Component{

    

    render(){

  return (
    <div className="Guide">
            <h1>Your personalized financial planning dashboard:</h1>

        <div className="Guide-title"><h3>Dashboard Contents:</h3></div>
        <ul className="Guide-ul"> 
        <li className="Guide-List"><Link to ='#Portfolio'><b>Portfolio</b></Link></li>
        <li><b>|</b></li>
            <li className="Guide-List"><Link to ='#Advice'><b>Advice</b></Link></li>
            <li><b>|</b></li>
            <li className="Guide-List"><Link to ="#Overtime"><b>Networth Overtime</b></Link></li>
            <li><b>|</b></li>
            <li className="Guide-List"><Link to ='#GoalsForm'><b>Goals</b></Link></li>
        </ul>
    </div>
  );
    }
}
