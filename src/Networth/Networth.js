import React, {Component} from 'react';
import './Networth.css'
import NetworthPie from './NetworthPie';
import GoalsForm from './Goals/GoalsForm'
import { faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank, faMoneyBillAlt, faMoneyCheck, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Overtime from "./Overtime"
import Resources from './Resources'
import ApiContext from './ApiContext'
import LineChart from './LineChart'
import config from "../config";
import CalculationApiService from "../services/calculations-service"
import TokenService from '../services/token-service'
import WalletsApiService from '../services/wallet-service'

export default class Networth extends Component {
  constructor(props){
    super(props);
    this.state={
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
        id:0,
        showDescription:false,
        advice:[],
        calculations:[],
        wallet:[]
    }
  }
  static contextType = ApiContext 

  componentDidMount() {
    Promise.all([
      CalculationApiService.getCalculations(),
      fetch(`${config.API_ENDPOINT}/api/advice`),
      WalletsApiService.getWallets()
      
      ])

      .then(([adviceRes, calculationsRes]) => {

        if (!adviceRes.ok) 
          return adviceRes.json().then(e => Promise.reject(e));
        if (!calculationsRes.ok)
          return calculationsRes.json().then(e => Promise.reject(e));
        // if (!walletRes.ok)
        //   return walletRes.json().then(e => Promise.reject(e));

        return Promise.all([
          adviceRes.json(),
          calculationsRes.json(),
          // walletRes.json()
        ]);
      })
      .then(([advice, calculations]) => {
        setTimeout(
          () => this.setState({advice:advice, entries: calculations}),
          2000
        );
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteEntry=(id)=>{
    this.setState({
      entries: this.state.entries.filter(entry => entry.id !== parseInt(id) )
    })
  }

  handleCredit=(e)=>{
    e.preventDefault();
    let value=(e.target.value).replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }

    this.setState({networth: false, credit: value})
  }
  handleInvestments=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }
 
    this.setState({networth: false,investments: value})
  }
  handleSavings=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }

    this.setState({networth: false, savings: value})
  }
  handleLoans=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,loans: value})
  }  
  handleOtherAssets=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,otherAssets: value})
  }
  handleOtherDebt=(e)=>{
    e.preventDefault();
    let value=e.target.value.replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }
  
    this.setState({networth: false,otherDebt: value})
  }

  handleOtherDescription=(e)=>{
    e.preventDefault();
    if(this.state.showDescription===false){
      this.setState({showDescription: true})
      }
      else this.setState({showDescription: false})
  
  }  
  handleOtherDescriptionDrop=(e)=>{
    e.preventDefault();
     this.setState({showDescription: false})
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
      {id: this.state.id+1, time: now , total: total, value: Number(total.replace(/[^0-9.-]+/g,""))}],total: total,
    resources: resources, networth: true, id: this.state.id+1})
  }
  render(){
  return (
    <ApiContext.Provider value={{
      entries: this.state.entries, 
      handleDeleteEntry: this.handleDeleteEntry,
      advice: this.state.advice
    }}>
    <div className="Networth">
      <h1>Your personalized financial planning dashboard:</h1>
      <div className='profile'>
        <div className="wallet">
        <h2>Wallet: </h2>
        </div>
        <br/>
        <div className="test">
        <div className="WalletTitle">
          <NetworthPie credit={this.state.credit} loans={this.state.loans} savings={this.state.savings} investments={this.state.investments} otherAssets={this.state.otherAssets} otherDebt={this.state.otherDebt}/>
          </div>
          <form className="WalletEntries">
          <br/> <br/>
          <div className="WalletForm">
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
          <label htmlFor='Savings'><FontAwesomeIcon icon={faMoneyBillAlt }/><FontAwesomeIcon icon={faQuestionCircle} className="help" onMouseEnter={e=>this.handleOtherDescription(e)} onMouseLeave={e=>this.handleOtherDescriptionDrop(e)}/>{' '}Other Assets $: {' '}</label>
          <input type='number' className='input'  onChange={e=>this.handleOtherAssets(e)}></input>
          <br/>
          <label htmlFor='Savings'><FontAwesomeIcon  icon={faMoneyCheck }/><FontAwesomeIcon icon={faQuestionCircle} className="help" onMouseEnter={e=>this.handleOtherDescription(e)} onMouseLeave={e=>this.handleOtherDescriptionDrop(e)}/>{' '}Other Debt $: {' '}</label>
          <input type='number' className='input'   onChange={e=>this.handleOtherDebt(e)}></input>
          <br/><br/>
          {this.state.showDescription
            ?( <div id='description'>Assets indicate that they earn value over time, while debts lose value OR need to be paid back over time.</div>)
            :(null
            )
          }
          <div className="WalletTitle">
          <button type="submit" className='submitButton' onClick={e=>this.handleSubmit(e)}>Submit</button>
          <br/>
          
          <br/>
          <p>Total Net Worth: {this.state.total}</p>
          <p>{this.state.error}</p>
          </div>
          </div>
        </form>

        </div>
      </div>


    <Resources resources={this.state.resources}/>
    <div className="chart">
    <Overtime entries={this.context.entries}/>
    {/* <LineChart data={this.state.entries}/> */}
    </div>
    <GoalsForm/>
    </div>
    </ApiContext.Provider>
  );
}
}

