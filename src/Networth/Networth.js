import React, {Component} from 'react';
import './Networth.css'
import NetworthPie from './NetworthPie';
import GoalsForm from './Goals/GoalsForm'
// import { } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Overtime from "./Overtime"
import Resources from './Resources'
import ApiContext from './ApiContext'
import LineChart from './LineChart'
import config from "../config";
import CalculationApiService from "../services/calculations-service"
import TokenService from '../services/token-service'
import WalletsApiService from '../services/wallet-service'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank, faMoneyBillAlt, faMoneyCheck, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank, faMoneyBillAlt, faMoneyCheck, faQuestionCircle)



export default class Networth extends Component {
  constructor(props){
    super(props);
    this.state={
        CreditCardDebt: 0,
        InvestmentsStocksBonds: 0,
        Loans: 0,
        Savings: 0,
        otherDebt: 0,
        otherAssets: 0,
        total: 0,
        entries: [{}],
        resources: null,
        networth: false, 
        error: '',
        id:0,
        showDescription:false,
        advice:[{}],
        calculations:[],
        wallet:[]
    }
  }
  static contextType = ApiContext 

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/advice`),
      
      
      ])

      .then((res) => {
 
        if (!res.ok) 
          return res.json().then(e => Promise.reject(e));



        return Promise.all([
          res.json(),
,
       
        ]);
      })
      .then(([advice]) => {
        setTimeout(
          () => this.setState({advice:[advice]}),
          2000
        );
      })
      .catch(error => {
        console.error({ error });
      });
  CalculationApiService.getCalculations()
      .then(res=>
        this.setState({entries: [res]})
        
      )
      WalletsApiService.getWallets()
      .then(res=>
        this.setState({wallet:res})
        )
  }


  handleDeleteEntry=()=>{
    CalculationApiService.getCalculations()
    .then(res=>
      this.setState({entries: [res]})  
    )

  }
  handleNetworth=(e)=>{
    e.preventDefault();
    let name= (e.target.name).replace(/[\s()/]/g,'')
    let value=(e.target.value).replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }

    this.setState({networth: false, [`${name}`]: value})
  }


  // handleOtherDescription=(e)=>{
  //   e.preventDefault();
  //   if(this.state.showDescription===false){
  //     this.setState({showDescription: true})
  //     }
  //     else this.setState({showDescription: false})
  
  // }  
  // handleOtherDescriptionDrop=(e)=>{
  //   e.preventDefault();
  //    this.setState({showDescription: false})
  // }

  handleSubmit(e){
    e.preventDefault();
    let options = { style: 'currency', currency: 'USD' };
    let numberFormat = new Intl.NumberFormat('en-US', options);
    let credit=parseFloat(this.state.CreditCardDebt)
    let investments=parseFloat(this.state.InvestmentsStocksBonds)
    let savings = parseFloat(this.state.Savings)
    let loans = parseFloat(this.state.Loans)
    // let otherDebt = parseFloat(this.state.otherDebt)
    // let otherAssets = parseFloat(this.state.otherAssets)
    let resources = this.state.resources
    if(credit>0 || loans >0){
      resources = true
    }
    else resources = false

    let total=investments  - credit  + savings - loans 
    total=numberFormat.format(total)
    let networth_total_value= Number(total.replace(/[^0-9.-]+/g,""))
    let networth_total=total
    let networth_investments= investments
    let networth_loans=loans
    let networth_credits=credit
    let networth_savings=savings
    if(this.state.entries[0] != null && this.state.entries[0].length>=12){
      this.setState({error: "The maximum historical networth is 12. Please delete some of your past entries.", 
      total: ''})
    }
    else CalculationApiService.postCalculations(networth_total,networth_total_value , networth_investments, networth_loans, 
    networth_credits, networth_savings)    
  }
  componentDidUpdate(){ 
    CalculationApiService.getCalculations()
    .then(res=>

        this.setState({entries: [res]})
        
      )
  }


  render(){
    let wallets = this.state.wallet
    
  return (
    <ApiContext.Provider value={{
      entries: this.state.entries, 
      handleDeleteEntry: this.handleDeleteEntry,
      advice: this.state.advice
    }}>
    <div className="Networth">
      <h1>Your personalized financial planning dashboard:</h1>
      <div className='Header__logged-in'>
      </div>
      <div className='profile'>
        <div className="wallet">
        <h2>Wallet: </h2>
        </div>
        <br/>
        <div className="test">
        <div className="WalletTitle">
          <NetworthPie credit={this.state.CreditCardDebt} loans={this.state.Loans} savings={this.state.Savings} investments={this.state.InvestmentsStocksBonds} otherAssets={this.state.otherAssets} otherDebt={this.state.otherDebt}/>
          </div>
          <form className="WalletEntries">
          <br/> <br/>
          <div className="WalletForm">
          
          {wallets.length>0
          ? (<div>{wallets.map(wallet =>
            <><label key = {wallet.id} htmlFor={wallet.wallet_categories}><FontAwesomeIcon className='icon' icon={wallet.icon.slice}/>{' '}{wallet.wallet_categories} $: {' '}</label>
            <input type='number' className='input' name={wallet.wallet_categories}  onChange={e=>this.handleNetworth(e)}></input></>)}
            <br/>
            </div>)
          :null}
          
          
          
          
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

