import React, {Component} from 'react';
import './Networth.css'
import NetworthPie from './NetworthPie';
import LineChart from './LineChart';

export default class Networth extends Component {
  constructor(props){
    super(props);
    this.state={
        categories: [{id: 1, name: "Credit Card",type: "Debt"},{id: 2, name: "Investments (Stocks/Bonds)", type: 'Asset'},
                    {id: 3, name: "Student Loans",type: 'Debt'},{id: 4, name: "Savings",type: "Asset"}],
        credit: 0,
        investments: 0,
        loans: 0,
        savings: 0,
        total: 0,
        month: "Jan",
        entries: [{month: 'Jan',total: 0}]
    }
  }
  handleCredit=(e)=>{
    e.preventDefault();
    let value=(e.target.value).replace('-','')
    if(value===''){
      value=0
    }

    this.setState({credit: value})
  }
  handleInvestments=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-','')
    if(value===''){
      value=0
    }
 
    this.setState({investments: value})
  }
  handleSavings=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-','')
    if(value===''){
      value=0
    }

    this.setState({savings: value})
  }
  handleLoans=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-e','')
    if(value===''){
      value=0
    }
  
    this.setState({loans: value})
  }
  handleEntry=(e)=>{
    e.preventDefault();
    let entryMonth=e.target.value
    this.setState({month: entryMonth})
  }

  handleSubmit(e){
    e.preventDefault();
    let credit=parseInt(this.state.credit)
    let investments=parseInt(this.state.investments)
    let savings = parseInt(this.state.savings)
    let loans = parseInt(this.state.loans)
    
    this.setState({total: investments  - credit  + savings - loans,
    entries: [ ...this.state.entries,
      {month: this.state.month, total: this.state.total}]})
    console.log(this.state.entries)
  }

  render(){
  
  let months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  const options = months.map(month => {
    return (
      <option>
        {month}
      </option>
    );
  });

  return (
    <div className="Networth">
      <div className='profile'>
        <br/>
        <form>
        <br/>
          <label htmlFor='Networth-wallet'>
          Wallet:
          </label>
          
          <NetworthPie credit={this.state.credit} loans={this.state.loans} savings={this.state.savings} investments={this.state.investments}/>
          <br/> <br/>
          <label htmlFor='Credit-Card'>Credit Card $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleCredit(e)}></input>
          <br/>
          <label htmlFor='Investments'>Investments (Stocks/Bonds) $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleInvestments(e)}></input>
          <br/>
          <label htmlFor='Loans'>Loans $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleLoans(e)}></input>
          <br/>
          <label htmlFor='Savings'>Savings $: {' '}</label>
          <input type='number' className='input' onChange={e=>this.handleSavings(e)}></input>
          <br/>
          <select
                type="text"
                name="month"
                id="month"
                value={this.state.month}
                onChange={e => this.handleEntry(e)}
                required
              >
                <option value={null}>Months</option>
                {options}
              </select>
              <br/><br/>
          <button type="submit" className='submitButton' onClick={e=>this.handleSubmit(e)}>Submit</button>
          <br/><br/>
          
          <br/>
          <p>Total Net Worth: 
            {this.state.total>=0
            ?(`$${this.state.total}`)
            : `-$${-1*this.state.total}`}
            </p>
        </form>


      </div>
      <div>
          <LineChart data={this.state.entries}/>
        </div>
    </div>
  );
}
}

