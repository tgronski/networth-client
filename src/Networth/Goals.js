import React,{Component} from 'react';
import './Goals.css'

export default class Goals extends Component{    
    constructor(props){
        super(props);
        this.state={
            goals: [],
            formEntry:'',
            error: "",
            id: 0
        }
    }

    handleDeleteGoal=(e)=>{
        e.preventDefault();
        let id= e.target.id
        this.setState({
          goals: this.state.goals.filter(goal => goal.id !== parseInt(id) )
        })
      }

    handleGoal=e=>{
        e.preventDefault();
        this.setState({formEntry:e.target.value})
    }
    handleSubmitGoals=(e)=>{
        e.preventDefault();
        if(this.state.goals.length<=2){    
        this.setState({goals: [...this.state.goals,
                {id: this.state.id + 1, goal: this.state.formEntry}],
            id: this.state.id+1})
        }
        else this.setState({error: "Limit to 3 goals"})
        
    }
  render(){
      let goals=this.state.goals
      
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
            <li key={goal.id}>{goal.goal} <button id={goal.id} onClick={this.handleDeleteGoal}>Delete</button></li>
            ))
        
        }
        
            
        </ul>
        </div>
        </div>
    )
}
}