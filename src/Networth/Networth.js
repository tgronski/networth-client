import React, {Component} from 'react';
import './Networth.css'
import NetworthPie from './NetworthPie';
import Goals from './Goals'
import { faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank, faMoneyBillAlt, faMoneyCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Overtime from "./Overtime"
import Resources from './Resources'
import ApiContext from './ApiContext'
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
        otherDebt: 0,
        otherAssets: 0,
        total: 0,
        entries: [],
        resources: null,
        networth: false, 
        error: '',
        id:0
    }
  }
  static contextType = ApiContext 
  handleDeleteEntry=(id)=>{
    this.setState({
      entries: this.state.entries.filter(entry => entry.id !== parseInt(id) )
    })
  }

  handleCredit=(e)=>{
    e.preventDefault();
    let value=(e.target.value).replace('-','')
    if(value===''){
      value=0
    }

    this.setState({networth: false, credit: value})
  }
  handleInvestments=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-','')
    if(value===''){
      value=0
    }
 
    this.setState({networth: false,investments: value})
  }
  handleSavings=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-','')
    if(value===''){
      value=0
    }

    this.setState({networth: false, savings: value})
  }
  handleLoans=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-e','')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,loans: value})
  }  
  handleOtherAssets=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-e','')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,otherAssets: value})
  }
  handleOtherDebt=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace('-e','')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,otherDebt: value})
  }


  handleSubmit(e){
    e.preventDefault();
    let options = { style: 'currency', currency: 'USD' };
    let numberFormat = new Intl.NumberFormat('en-US', options);
    let credit=parseFloat(this.state.credit)
    let investments=parseFloat(this.state.investments)
    let savings = parseFloat(this.state.savings)
    let loans = parseFloat(this.state.loans)
    let otherDebt = parseFloat(this.state.otherDebt)
    let otherAssets = parseFloat(this.state.otherAssets)
    let resources = this.state.resources
    let now= new Date().toDateString()
    if(credit>0 || loans >0){
      resources = true
    }
    else resources = false

    let total=investments  - credit  + savings - loans - otherDebt + otherAssets
    total=numberFormat.format(total)
    
    if(this.state.entries.length===12){
      this.setState({error: "The maximum historical networth is 12. Please delete some of your past entries.", 
      total: ''})
    }
    else this.setState({entries: [ ...this.state.entries,
      {id: this.state.id+1, time: now , total: total}],total: total,
    resources: resources, networth: true, id: this.state.id+1})
  }
  render(){

  return (
    <ApiContext.Provider value={{
      entries: this.state.entries, 
      handleDeleteEntry: this.handleDeleteEntry
    }}>
    <div className="Networth">
      <h1>Your personalized financial planning dashboard:</h1>
      <div className='profile'>
    
        <form>
        <label htmlFor='Networth-wallet'>
          <br/>
          Wallet:
          </label>
        <br/>

          <NetworthPie credit={this.state.credit} loans={this.state.loans} savings={this.state.savings} investments={this.state.investments} otherAssets={this.state.otherAssets} otherDebt={this.state.otherDebt}/>
      
          <br/> <br/>
          <label htmlFor='Credit-Card'><FontAwesomeIcon icon={faCreditCard}/>{' '}Credit Card Bill $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleCredit(e)}></input>
          <br/>
          <label htmlFor='Investments'><FontAwesomeIcon icon={faLandmark}/>{' '}Investments (Stocks/Bonds) $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleInvestments(e)}></input>
          <br/>
          <label htmlFor='Loans'><FontAwesomeIcon icon={faHandHoldingUsd}/>{' '}Loans $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleLoans(e)}></input>
          <br/>
          <label htmlFor='Savings'><FontAwesomeIcon icon={faPiggyBank }/>{' '}Savings $: {' '}</label>
          <input type='number' className='input' onChange={e=>this.handleSavings(e)}></input>
          <br/>
          <label htmlFor='Savings'><FontAwesomeIcon icon={faMoneyBillAlt }/>{' '}Other Assets $: {' '}</label>
          <input type='number' className='input' onChange={e=>this.handleOtherAssets(e)}></input>
          <br/>
          <label htmlFor='Savings'><FontAwesomeIcon icon={faMoneyCheck }/>{' '}Other Debt $: {' '}</label>
          <input type='number' className='input' onChange={e=>this.handleOtherDebt(e)}></input>
          <br/><br/>

          <button type="submit" className='submitButton' onClick={e=>this.handleSubmit(e)}>Submit</button>
          <br/><br/>
          
          <br/>
          <p>Total Net Worth: {this.state.total}</p>
          <p>{this.state.error}</p>

        </form>


      </div>
    <Resources resources={this.state.resources}/>
    <Overtime entries={this.context.entries}/>
    {/* <LineChart data={this.state.entries}/> */}
    <Goals/>
    </div>
    </ApiContext.Provider>
  );
}
}

