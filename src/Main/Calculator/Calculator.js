import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import './Calculator.css'
library.add( faCoffee,
  faCreditCard, faLandmark, faHandHoldingUsd, faPiggyBank,faQuestionCircle)



export default class Calculator extends Component {
  constructor(props){
    super(props);
    this.state={
      CreditCard: 0,
      Investments: 0,
      Loans: 0,
      Savings: 0,
      total: '',
      showDescription: false,
      wallet:[{id:1, categories: 'Credit Card', icons: faCreditCard},
      {id:2, categories: 'Investments', icons:  faLandmark},
      {id:3, categories: 'Loans', icons:  faHandHoldingUsd},
      {id:4, categories: 'Savings', icons:  faPiggyBank}
      ]
    }
  }

  handleNetworth=(e)=>{
    e.preventDefault();
    let name= (e.target.name).replace(/[\s()/]/g,'')
    let value=(e.target.value).replace(/[^0-9.-]+/g,'')
    if(value===''){
      value=0
    }
    this.setState({[`${name}`]: value,total: ''})
  }
  handleHelpIcon=()=>{
    if(this.state.showDescription===false){
      this.setState({showDescription:true})
    }
  }
  handleHelpIconRemove=()=>{
    if(this.state.showDescription){
      this.setState({showDescription:false})
    }
  }
  handleSubmit(e){
    e.preventDefault();
    let options = { style: 'currency', currency: 'USD' };
    let numberFormat = new Intl.NumberFormat('en-US', options);
    let credit=parseFloat(this.state.CreditCard)
    let investments=parseFloat(this.state.Investments)
    let savings = parseFloat(this.state.Savings)
    let loans = parseFloat(this.state.Loans)
    let total=investments  - credit  + savings - loans 
    total=numberFormat.format(total)
    this.setState({total: total})

  }

  render(){
  let wallets = this.state.wallet
  if (wallets.length>0){
  return (<div className="Calculator">
          <form className="CalculatorForm">
          {wallets
          ? (<div >{wallets.map(wallet =>
            < div key={wallet.id}>  
            <br/>
            <label  htmlFor={wallet.categories}><FontAwesomeIcon className='icon'  icon={wallet.icons}/>{' '}{wallet.categories} $: {' '}</label>
            <input type='number'  className='input' name={wallet.categories}  onChange={e=>this.handleNetworth(e)}></input></div>)}
            <br/>
            </div>)
          :null}
          <br/>
          <button type="submit" className='submitButton' onClick={e=>this.handleSubmit(e)}>Submit</button>
          <br/>
          
          <br/>
          <p><FontAwesomeIcon onMouseEnter={this.handleHelpIcon} onMouseLeave={this.handleHelpIconRemove} className='HelpIcon'icon={faQuestionCircle}/>{' '} Total Net Worth: {this.state.total}</p>
  
         
        </form>
        {this.state.showDescription
          ? (<i className="description">Networth is the total of your saved assests, minus any debts you are still paying off. Create an account to learn more!</i>)
          : null
          }
           <p>{this.state.error}</p>
        </div>
  );
}
  }
}


