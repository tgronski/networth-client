import React, {Component} from 'react';
import Calculator from '../Calculator/Calculator';
import Preview from '../Preview/Preview';
import '../App.css';
import Testamonials from '../Testamonials/Testamonials';
import LoginLink from './LoginLink'

export default class Main extends Component {

  render() {
  return (
    <div className="Main">
  
  <p className='preview'>Try out the net-worth-calculator:</p>
        <LoginLink/>
        <Calculator/>
        <br/>
        <br/>
        <br/>
        <Preview/>
        <br/>
        <Testamonials/>
    </div>
  )
  };
}

