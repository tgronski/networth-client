import React,{Component} from 'react';
import ApiContext from '../ApiContext'


export default class Goals extends Component{    

    static contextType = ApiContext 


  render(){
    let goals= this.context.goals
    let networth= 0
    let number = null
    let recentValue= null
    if (this.context.entries[0] !=null && this.context.entries[0].length>0){
      number = this.context.entries[0].length
      recentValue= this.context.entries[0][number-1]
    }
    let options = { style: 'currency', currency: 'USD' };
    let numberFormat = new Intl.NumberFormat('en-US', options);
    if (recentValue!=null){
      networth =(recentValue.networth_total)
      networth= Number(networth.replace(/[^0-9.-]+/g,""))

      }
  return (

        <div className='goalsList' >
          <h3>Saved Goals List:</h3>
          {goals.length>0
          ? (<ul >

          {goals.map(goal=>(
              
              <li  className="goalsListItem" key={goal.id}>{goal.goalname}:{' '}{numberFormat.format(goal.goalvalue)} 
              <br/>
              Percent to Goal: {' '}
              {networth<goal.goalvalue
              ?(`${((networth/parseFloat(goal.goalvalue))*100).toFixed(2)}%`)
              : "100%"}
              <button id={goal.id} onClick={e=>this.context.handleDeleteGoal(e)}>Delete</button></li>
               ))}
            </ul>)
          
          : <i>Add a goal to track your progress</i>
          }

    
    </div>)
   

}
   
}

