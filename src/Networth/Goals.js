import React,{Component} from 'react';
import './Goals.css'
import * as d3 from "d3";

import ApiContext from './ApiContext'
import { sum } from 'd3';


export default class Goals extends Component{    
    constructor(props){
        super(props);
        this.state={
            goals: [],
            goal_titleEntry:'',
            goal_valueEntry:'',
            error: "",
            id: 0, 
            data:[],
        }
    }
    static contextType = ApiContext 


    handleDeleteGoal=(e)=>{
        e.preventDefault();
        let id= e.target.id
        this.setState({
          goals: this.state.goals.filter(goal => goal.id !== parseInt(id) )
        })
      }

    handleGoal=e=>{
        e.preventDefault();
        let name=e.target.name
        this.setState({[`${name}Entry`]:e.target.value})
        
    }
    handleSubmitGoals=(e)=>{
        e.preventDefault();
        let networth= 0
        let number = this.context.entries.length
        let recentValue= this.context.entries[number-1]
        if (recentValue!=null){
          networth =(recentValue.total)
          networth= Number(networth.replace(/[^-]+/g,""))
  
        }
        if(this.state.goals.length<=2){    
        this.setState({goals: [...this.state.goals,
                {id: this.state.id + 1, goalname: this.state.goal_titleEntry,goalvalue: this.state.goal_valueEntry}],
            id: this.state.id+1})
        }
        else this.setState({error: "Limit to 3 goals"})
        
    }
  render(){
      let goals=this.state.goals
      let options = { style: 'currency', currency: 'USD' };
      let numberFormat = new Intl.NumberFormat('en-US', options);
      let number = this.context.entries.length
      let recentValue= this.context.entries[number-1]
      let networth= 0
      if (recentValue!=null){
        networth =(recentValue.total)
        networth= Number(networth.replace(/[^0-9.-]+/g,""))

        }
    let sumGoals = 0 
    for(let i=0; i<this.state.goals.length; i++){
        console.log(this.state.goals[i].goalvalue)
            sumGoals = parseFloat(this.state.goals[i].goalvalue)+sumGoals
    }
    let data= [0]
    if(sumGoals>0 && networth<sumGoals){
        data = [networth/parseFloat(sumGoals)*100,100-(networth/parseFloat(sumGoals)*100)]
    }
    else if (sumGoals>0 && networth>sumGoals){
        data= [100,0]
    }
    else data= [0,100]

        const height=200;
        const width=200;
        let pie=d3.pie()(data)
        let arc=d3.arc()
        .innerRadius(70)
        .outerRadius(100);
        let colors=d3.interpolateRgb("#152950","#738683");
    

  return (
        <div className='Goals'>
        <h1>Goals</h1>
        <div className='GoalsForm'>
        <form
         
        onSubmit={(e)=>this.handleSubmitGoals(e)}
        >

        <div className='goal_title'>
        <label htmlFor='GoalsForm__goal_title'>
        Goal: {' '}
        </label>
        <input
        required
        name='goal_title'
        onChange={e=>this.handleGoal(e)}
        id='GoalsForm__goal_title'>
        
        </input>
        <label htmlFor='GoalsForm__goal_title'>
        Goal Value: {' '}$
        </label>
        <input
        required
        name='goal_value'
        onChange={e=>this.handleGoal(e)}
        id='GoalsForm__goal_value'>
        </input>
        </div>
       {" "}
        <button className='submitButton' type='submit'>
        Add Goal
        </button>
        <div>
        {this.state.goals.length<=2
        ? null
        :<p>{this.state.error}</p>}
        </div>
        </form>
        <ul className='goalsList'>Goals

        {goals.map(goal=>(
            <li key={goal.id}>{goal.goalname}:{' '}{numberFormat.format(goal.goalvalue)} 
            <br/>Percent to Goal: {' '}{((networth/parseFloat(goal.goalvalue))*100).toFixed()}%
            <button id={goal.id} onClick={this.handleDeleteGoal}>Delete</button></li>
            ))
        
        }
           

       

            
        </ul>
        <div className='wheel'>
        <p>Percent to All Goals:</p>
        <svg className='report'>
        
                    <g transform={`translate(${width/2},${height/2})`}>
                        {pie.map((slice, index)=>{
                            let sliceColor= colors(index/(pie.length-1));

                            return<> <path key={slice.index} d={arc(slice)} fill={sliceColor} />
                            <text textAnchor='middle' x="0" y="0" fill='black'>
                               {data[0].toFixed()}% 
                            </text>
                            </>
                        })}

                    </g>
            </svg>
            </div>
        </div>
        </div>
    )
}
}



