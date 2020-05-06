import React,{Component} from 'react';


export default class Key extends Component{    



  render(){

  return (

    <div className="KeyMenu" >
        <p>Key:</p>
        <ul className='Key'>
        <li><p className='Debt'>{" "}</p></li>
        <li><p>{" "}Debts</p></li> 
        <li><p className='Asset'>{" "}</p></li>
        <li><p>{" "} Assets</p></li>

        </ul>

    </div>)
   

}
   
}

