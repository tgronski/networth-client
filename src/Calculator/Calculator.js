import React, {Component} from 'react';


export default class Calculator extends Component {
  constructor(props){
    super(props);
    this.state={
        assets: "0.00",
        debts: "0.00",
    }
  }
  validateEntry = e => {
    e.preventDefault();
    const value=(e.target.value)
    const name=e.target.name;
    this.setState({[`${name}`]: value})

  }
  render(){
    const total=(this.state.assets-this.state.debts).toFixed(2)
  return (
    <div className="Calculator">
      
      <form id='calculator'>
            <div className="form-section">
            <label htmlFor="assets">Assets $</label>
            <input type="number" id="assets-total" name="assets" placeholder='0.00' value={this.state.assets} onChange={e => this.validateEntry(e)} required/>
            <br/>
            <br/>
            <label htmlFor="debts"> Debts $</label>
            <input type="number" id="debts-total" name="debts" placeholder='0.00' value={this.state.debts} onChange={e => this.validateEntry(e)} required/>
          </div>
        <p>Your net worth is ${total}</p>
        </form>

    </div>
  );
}
}

