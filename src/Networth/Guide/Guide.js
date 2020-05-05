import React, {Component} from 'react';
import "./Guide.css"
import { HashLink as Link } from 'react-router-hash-link';

export default class Guide extends Component{

    

    render(){

  return (
    <div className="Guide">
        <b>Guide:</b>
        <ul > 
        <li className="Guide-List"><Link to ='#Portfolio'><b>Portfolio</b></Link></li>

            <li className="Guide-List"><Link to ='#Advice'><b>Advice</b></Link></li>
            <li className="Guide-List"><Link to ="#Overtime"><b>Networth Overtime</b></Link></li>
            <li className="Guide-List"><Link to ='#GoalsForm'><b>Goals</b></Link></li>
        </ul>
    </div>
  );
    }
}
