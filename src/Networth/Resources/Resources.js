import React,{Component} from 'react';
import ApiContext from '../ApiContext'
import './Resources.css'

export default class Resources extends Component{  
  static contextType = ApiContext;

  render(){
    let advice = this.context.advice[0]
    let assets=advice[1]
    let debts= advice[0]
    let length=0
    if(this.context.entries[0] !== null){
      length= this.context.entries[0].length
    }
    let updatednetworth=0
    if(length>0){
      updatednetworth = this.context.entries[0][length-1]
    }
  return (
    <div className="Resources">
      {length===0
      ?(<div> 
        <h2>Financial Planning Resources:</h2> 
        <i>Submit your most recent networth data to get the most accurate information</i>
        </div>)
      
      :null
      }
      {(updatednetworth.networth_total_value<0
      ?(<ul className="list" id='debtList'> <h2>Financial Planning Resources:</h2> 
           <li key={debts.id}>We see that you are working on paying off some debt, great work! You may want to check out <br/> money saving sites like: {debts.content}</li>
           <br/>
      </ul>)
      : null
    )}
      {(updatednetworth.networth_total_value>0
      ?(<ul className="list" id='assetList'> <h2>Financial Planning Resources:</h2> 
      
           <li key={assets.id}>We see that you are saving money, which is great! You may want to consider <br/>an investment account like {assets.content} to continue saving. </li>
           <br/>
            </ul>)
      : null
    )}


<br/><br/>

    </div>
  )
}
}