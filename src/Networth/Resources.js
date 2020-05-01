import React,{Component} from 'react';
import ApiContext from './ApiContext'


export default class Resources extends Component{  
  static contextType = ApiContext;

  render(){
    let advice=this.context.advice
    let assets=advice.filter(advice=>advice.category===2)
    let debts=advice.filter(advice=>advice.category===1)
    let length=0
    if(this.context.entries[0] != null){
      length= this.context.entries[0].length
    }
    let updatednetworth=0
    if(length>0){
      updatednetworth = this.context.entries[0][length-1]
    }

  return (
    <div className="Resources">
      {(updatednetworth.value<0
      ?(<ul className="list" id='debtList'><h2>Financial Planning Resources:</h2>
        {debts.map(debt=>{
          return <li key={debt.id}>{debt.content}</li>
        })}
      </ul>)
      : null
    )}
      {(updatednetworth.value>0
      ?(<ul className="list" id='debtList'><h2>Financial Planning Resources:</h2>
        {assets.map(asset=>{
          return <li key={asset.id}>{asset.content}</li>
        })}
            
            </ul>)
      : null
    )}




    </div>
  )
}
}