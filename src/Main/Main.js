import React, {Component} from 'react';
import Calculator from './Calculator/Calculator';
import Preview from './Preview/Preview';
import '../App.css';
import Testamonials from './Testamonials/Testamonials';

export default class Main extends Component {

  render() {
  return (
    <div className="Main">
  
  <p className='preview'>Try out the net-worth-calculator:</p>
        <Calculator/>
        <br/>
        <br/>
        <Preview/>
        <br/>
        <Testamonials/>
    </div>
  )
  };
}

